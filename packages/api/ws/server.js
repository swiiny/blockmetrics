import { getBlockchains } from './utils/fetch.js';
import { WebSocketServer } from 'ws';
import { createDbPool } from './utils/pool.js';

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
const clients = new Map();
let isFetchDeactivate = true;

async function fetchAndSendBlockchains() {
	while (!isFetchDeactivate) {
		console.log('start new loop process');
		const res = await getBlockchains(pool, {
			sortBy: 'blockchain_power_consumption',
			desc: false,
			limit: 30
		});

		if (res?.length) {
			const outbound = JSON.stringify(res[0]);

			// log lengths of clients
			// console.log(`${clients.size} clients connected`);
			[...clients.keys()].forEach((client) => {
				client.send(outbound);
			});
		}

		// wait 3 seconds
		await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
	}
}

async function startWebsocketServer() {
	wss.on('connection', (ws) => {
		console.log('new client connected');
		clients.set(ws);

		if (isFetchDeactivate) {
			isFetchDeactivate = false;
			fetchAndSendBlockchains();
		}
	});

	wss.on('close', (ws) => {
		console.log('client disconnected');
		clients.delete(ws);

		if (clients.size === 0) {
			console.log('no clients connected');
			isFetchDeactivate = true;
		}
	});
}

async function init() {
	pool = await createDbPool();

	startWebsocketServer();
}

init();
