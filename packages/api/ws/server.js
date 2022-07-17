'use strict';

import { WebSocketServer } from 'ws';
import { createDbPool } from './utils/pool.js';
import {
	fetchAndSendBlockchains,
	fetchAndSendBlockchainsToClient,
	isBlockchainsActivated
} from './subscriptions/blockchains.js';
import { blockchainId } from './utils/variables.js';
import {
	blockchainActivated,
	fetchAndSendSingleBlockchainToClient,
	fetchSingleBlockchain
} from './subscriptions/blockchain.js';

// connection pool
let pool;

const wss = new WebSocketServer({
	port: process.env.WS_PORT,
	perMessageDeflate: {
		zlibDeflateOptions: {
			// See zlib defaults.
			chunkSize: 1024,
			memLevel: 7,
			level: 3
		},
		zlibInflateOptions: {
			chunkSize: 10 * 1024
		},
		// Other options settable:
		clientNoContextTakeover: true, // Defaults to negotiated value.
		serverNoContextTakeover: true, // Defaults to negotiated value.
		serverMaxWindowBits: 10, // Defaults to negotiated value.
		// Below options specified as default values.
		concurrencyLimit: 10, // Limits zlib concurrency for perf.
		threshold: 1024 // Size (in bytes) below which messages
		// should not be compressed if context takeover is disabled.
	}
});

// user connected to the websocket
export const clients = new Map();

// set client to be alive
function heartbeat() {
	this.isAlive = true;
}

function checkSubscriptions(con, client) {
	if (!isBlockchainsActivated) {
		fetchAndSendBlockchains(pool);
	} else {
		// send data to clients without delay
		fetchAndSendBlockchainsToClient(con, client);
	}

	Object.values(blockchainId).map((id) => {
		if (!blockchainActivated[id]) {
			fetchSingleBlockchain(pool, id);
		} else {
			fetchAndSendSingleBlockchainToClient(con, client, id);
		}
	});
}

async function startWebsocketServer() {
	const con = await pool.getConnection();
	// heartbeat detect and delete dead connection
	const interval = setInterval(function ping() {
		wss.clients.forEach(function each(ws) {
			if (ws.isAlive === false) return ws.terminate();

			ws.isAlive = false;
			ws.ping();
		});
	}, 3000);

	wss.on('connection', (ws) => {
		ws.isAlive = true;
		ws.on('pong', heartbeat);

		ws.on('message', (message) => {
			const strMessage = message?.toString();

			if (!strMessage) {
				return;
			}

			const data = JSON.parse(strMessage);

			console.log('data: ', data);

			if (data?.type === 'subscribe') {
				if (!ws.subscriptions) {
					ws.subscriptions = [];
				}

				ws.subscriptions.push(data.channel);

				checkSubscriptions(con, ws);
			} else if (data?.type === 'unsubscribe') {
				if (!ws.subscriptions) {
					return;
				}

				ws.subscriptions = ws.subscriptions.filter((sub) => sub !== data.channel);
			}
		});

		clients.set(ws);

		console.log('current clients: ', clients.size);

		ws.on('close', () => {
			clients.delete(ws);

			console.log('current clients: ', clients.size);

			if (clients.size === 0) {
				console.log('=> streaming stopped');
				clearInterval(interval);
			}
		});
	});
}

async function init() {
	pool = await createDbPool();

	startWebsocketServer();
}

init();
