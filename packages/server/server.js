import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { fetchBitcoinData, fetchEVMBlocksFor } from './utils/fetch/blocks.js';
import { updateTokensCountForNetworks } from './utils/fetch/coingecko.js';
import { getGasPrice } from './utils/fetch/gasPrice.js';
import { getAvalancheNodeCount, getBitcoinNodeCount, getBscNodeCount, getEthNodeCount, getPolygonNodeCount } from './utils/fetch/nodeCount.js';
import { createDbPool } from './utils/pool/pool.js';
import { updateDbGasPrice } from './utils/update/gasPrice.js';
import { updateDbNodeCount } from './utils/update/nodeCount.js';

// chain uuid in the database
export const chains = {
	ethereum: {
		id: '387123e4-6a73-44aa-b57e-79b5ed1246d4',
		name: 'Ethereum',
		coingeckoId: 'ethereum',
		rpc: process.env.RPC_ETHEREUM_ALCHEMY
	},
	bsc: {
		id: '0bb6df38-231e-47d3-b427-88d16a65580e',
		name: 'Binance SC',
		coingeckoId: 'binance-smart-chain',
		rpc: process.env.RPC_BSC_PUBLIC_AGGREGATOR
	},
	polygon: {
		id: '4df0b4ad-2165-4543-a74b-7cdf46f9c5e3',
		name: 'Polygon',
		coingeckoId: 'polygon-pos',
		rpc: process.env.RPC_POLYGON_ALCHEMY
	},
	bitcoin: {
		id: '1daa2a79-98cc-49a5-970a-0ad620a8b0d9',
		name: 'Bitcoin',
		coingeckoId: 'bitcoin'
	},
	avalanche: {
		id: '7fc003e2-680f-4e69-9741-b00c18d2e6dc',
		name: 'Avalanche',
		coingeckoId: 'avalanche',
		rpc: process.env.RPC_AVALANCHE_CHAINSTACK
	}
};

const BASE_URL_V1 = "v1/server"

const limiter = rateLimit({
	windowMs: 1000,
	max: 50,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

// fetch blockchains node count and update the database
async function updateNodeCount() {
	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE NODE COUNT START ==========', Date.now());
	}

	try {
		const pool = await createDbPool();
		const con = await pool.getConnection();

		if (!con) {
			return 1;
		}

		const promises = [
			getEthNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chains.ethereum.id, res);
					return {
						count: res,
						id: chains.ethereum.id
					};
				})
				.catch((err) => null),
			getBscNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chains.bsc.id, res);
					return {
						count: res,
						id: chains.bsc.id
					};
				})
				.catch((err) => null),
			getPolygonNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chains.polygon.id, res);
					return {
						count: res,
						id: chains.polygon.id
					};
				})
				.catch((err) => null),
			getAvalancheNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chains.avalanche.id, res);
					return {
						count: res,
						id: chains.avalanche.id
					};
				})
				.catch((err) => null),
			getBitcoinNodeCount()
				.then((res) => {
					updateDbNodeCount(con, chains.bitcoin.id, res);
					return {
						count: res,
						id: chains.bitcoin.id
					};
				})
				.catch((err) => null)
		].filter((res) => res !== null);

		/*
  const resolvedPromises = await Promise.all(promises);
	console.log("nodecount", resolvedPromises);
  */

		con.release();

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('========== UPDATE NODE COUNT END ==========', Date.now());		
		}

		return 0;
	} catch {
		console.error('updateNodeCount', err);
		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('========== UPDATE NODE COUNT END WITH ERROR ==========', Date.now());
		}
		return 2;
	}
}

// fetch blockchains gas price and update the database
async function updateGasPrice() {
	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE GAS PRICE START ==========', Date.now());
	}

	try {
		const pool = await createDbPool();
		const con = await pool.getConnection();

		if (!con) {
			return 1;
		}

		const promises = Object.keys(chains)
			.map((key) => chains[key])
			.filter((chain) => chain.rpc)
			.map(async (chain) => {
				getGasPrice(chain.rpc).then((gasPrice) => {
					updateDbGasPrice(con, chain.id, gasPrice);
				});
			});

		await Promise.all(promises);

		con.release();

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('========== UPDATE GAS PRICE END ==========', Date.now());
		}

		return 0;
	} catch (err) {
		console.error('updateGasPrice', err);

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('========== UPDATE GAS PRICE END WITH ERROR ==========', Date.now());
		}

		return 2;
	}
}

// test endpoint, should respond the string "pong"
app.get(`${BASE_URL_V1}/ping`, async (req, res) => {
	res.send("pong");
});

async function startFetchData() {
	try {
		const pool = await createDbPool();
		const res = await pool.getConnection();

		res.release();

		updateNodeCount();
		updateGasPrice();
		
		fetchEVMBlocksFor(chains.ethereum);
		fetchEVMBlocksFor(chains.polygon);
		fetchEVMBlocksFor(chains.bsc);
		fetchEVMBlocksFor(chains.avalanche);

		fetchBitcoinData();

		updateTokensCountForNetworks();

		setInterval(() => {
			updateGasPrice();
		}, 60 * 1000);

		setInterval(() => {
			updateNodeCount();
		}, 10 * 60 * 1000);
	} catch {
		setTimeout(() => {
			startFetchData();
		}, 1 * 60 * 1000)
	}
}	

app.listen(process.env.SERVER_PORT, async () => {
	console.log(`Server listening on port ${process.env.SERVER_PORT}`);

	const runWorkingFeatures = false;

	startFetchData();

	if (runWorkingFeatures) {
		// working features
		updateNodeCount();
		updateGasPrice();

		fetchEVMBlocksFor(chains.ethereum);
		fetchEVMBlocksFor(chains.polygon);
		fetchEVMBlocksFor(chains.bsc);
		fetchEVMBlocksFor(chains.avalanche);

		fetchBitcoinData();

		updateTokensCountForNetworks();

		setInterval(() => {
			updateGasPrice();
		}, 60 * 1000);

		setInterval(() => {
			updateNodeCount();
		}, 10 * 60 * 1000);
	}
});
