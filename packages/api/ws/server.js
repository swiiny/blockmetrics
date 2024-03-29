'use strict';

import { WebSocketServer } from 'ws';
import { createDbPool } from './utils/pool.js';
import {
	fetchAndSendBlockchains,
	fetchAndSendBlockchainsToClient,
	isBlockchainsActivated
} from './subscriptions/blockchains.js';
import { blockchainId, blockchainTotal, subscribeType } from './utils/variables.js';
import {
	blockchainActivated,
	fetchAndSendSingleBlockchainToClient,
	fetchSingleBlockchain
} from './subscriptions/blockchain.js';
import {
	blockchainsTotalActivated,
	fetchBlockchainTotal,
	fetchBlockchainTotalToClient
} from './subscriptions/blockchainsTotal.js';
import {
	fetchAndSendBlockchainCards,
	fetchAndSendBlockchainCardToClient,
	isBlockchainCardsActivated
} from './subscriptions/blockchainCards.js';

// connection pool
let pool;

const wss = new WebSocketServer({
	port: process.env.WS_PORT,
	perMessageDeflate: false
});

// user connected to the websocket
export const clients = new Map();

function checkSubscriptions(con, client, channelToCheck) {
	if (channelToCheck === subscribeType.blockchains) {
		if (!isBlockchainsActivated) {
			fetchAndSendBlockchains(pool);
		} else {
			// send data to clients without delay
			fetchAndSendBlockchainsToClient(con, client);
		}

		return;
	}

	if (channelToCheck === subscribeType.blockchainCards) {
		if (!isBlockchainCardsActivated) {
			fetchAndSendBlockchainCards(pool);
		} else {
			// send data to clients without delay
			fetchAndSendBlockchainCardToClient(con, client);
		}

		return;
	}

	if (blockchainId[channelToCheck]) {
		Object.values(blockchainId)
			.filter((id) => id === channelToCheck)
			.map((id) => {
				console.log('=> fetching blockchain: ', id);
				if (!blockchainActivated[id]) {
					fetchSingleBlockchain(pool, id);
				} else {
					fetchAndSendSingleBlockchainToClient(con, client, id);
				}
			});

		return;
	}

	if (blockchainTotal[channelToCheck]) {
		Object.values(blockchainTotal)
			.filter((channel) => channel === channelToCheck)
			.map((channel) => {
				if (!blockchainsTotalActivated[channel]) {
					fetchBlockchainTotal(pool, channel);
				} else {
					fetchBlockchainTotalToClient(con, client, channel);
				}
			});

		return;
	}
}

async function startWebsocketServer() {
	const con = await pool.getConnection();
	// heartbeat detect and delete dead connection
	setInterval(() => {
		wss.clients.forEach(function each(ws) {
			if (ws.isAlive === false) return ws.terminate();

			ws.isAlive = false;
			ws.send(JSON.stringify({ data: 'ping' }));
		});
	}, 30000);

	wss.on('connection', (ws) => {
		ws.isAlive = true;

		ws.on('message', (message) => {
			const strMessage = message?.toString();

			if (!strMessage) {
				return;
			}

			if (strMessage === 'pong') {
				ws.isAlive = true;
				return;
			}

			const data = JSON.parse(strMessage);

			if (data?.type === 'subscribe') {
				if (!ws.subscriptions) {
					ws.subscriptions = [];
				}

				ws.subscriptions.push(data.channel);

				checkSubscriptions(con, ws, data.channel);
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
			}
		});
	});
}

async function init() {
	pool = await createDbPool();

	startWebsocketServer();
}

init();
