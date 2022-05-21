import cors from 'cors';
import { ethers } from 'ethers';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { fetchBitcoinData, fetchEVMBlocksFor } from './utils/fetch/blocks.js';
import { updateTokensCountForNetworks } from './utils/fetch/coingecko.js';
import { getGasPrice } from './utils/fetch/gasPrice.js';
import { getAvalancheNodeCount, getBitcoinNodeCount, getBscNodeCount, getEthNodeCount, getFantomNodeCount } from './utils/fetch/nodeCount.js';
import { calculatePowerConsumption, getRpcByChainId } from './utils/functions.js';
import { createDbPool } from './utils/pool/pool.js';
import { getPowerConsumptionDataForPoS, getPublicAddressFromAccountWhereContractIsNull, updateIsContractInAccount } from './utils/sql.js';
import { updateDbGasPrice } from './utils/update/gasPrice.js';
import { updateDbNodeCount } from './utils/update/nodeCount.js';
import { updatePowerConsumptionInDb } from './utils/update/powerConsumption.js';

// chain uuid in the database
export const chains = {
	ethereum: {
		id: '387123e4-6a73-44aa-b57e-79b5ed1246d4',
		name: 'Ethereum',
		coingeckoId: 'ethereum',
		rpc: process.env.RPC_ETHEREUM
	},
	bsc: {
		id: '0bb6df38-231e-47d3-b427-88d16a65580e',
		name: 'Binance SC',
		coingeckoId: 'binance-smart-chain',
		rpc: process.env.RPC_BSC
	},
	polygon: {
		id: '4df0b4ad-2165-4543-a74b-7cdf46f9c5e3',
		name: 'Polygon',
		coingeckoId: 'polygon-pos',
		rpc: process.env.RPC_POLYGON
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
		rpc: process.env.RPC_AVALANCHE
	},
	fantom: {
		id: 'a3820e29-a5fc-41af-a5c1-07119795e07d',
		name: 'Fantom',
		coingeckoId: 'fantom',
		rpc: process.env.RPC_FANTOM
	}
};

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
let pool;

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

// fetch blockchains node count and update the database
async function updateNodeCount() {
	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE NODE COUNT START ==========', Date.now());
	}

	try {
		const con = await pool.getConnection();

		if (!con) {
			return 1;
		}

		const promises = [
			getEthNodeCount()
				.then((res) => updateDbNodeCount(con, chains.ethereum.id, res))
				.catch(() => null),
			getBscNodeCount()
				.then((res) => updateDbNodeCount(con, chains.bsc.id, res))
				.catch(() => null),
			/*getPolygonNodeCount()
				.then((res) => updateDbNodeCount(con, chains.polygon.id, res))
				.catch(() => null),*/
			getAvalancheNodeCount()
				.then((res) => updateDbNodeCount(con, chains.avalanche.id, res))
				.catch(() => null),
			getBitcoinNodeCount()
				.then((res) => updateDbNodeCount(con, chains.bitcoin.id, res))
				.catch(() => null),
			getFantomNodeCount()
				.then((res) => updateDbNodeCount(con, chains.fantom.id, res))
				.catch(() => null)
		];

		await Promise.all(promises);

		updatePowerConsumption();

		con.destroy();

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

	const con = await pool.getConnection();

	try {
		const promises = Object.keys(chains)
			.map((key) => chains[key])
			.filter((chain) => chain.rpc)
			.map(async (chain) =>
				getGasPrice(chain.rpc).then((gasPrice) => {
					updateDbGasPrice(con, chain.id, gasPrice);
				})
			);

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

async function updatePowerConsumption() {
	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION START ==========', Date.now().toLocaleString());
	}

	const con = await pool.getConnection();

	try {
		// fetch single_node_power_consumption, testnet_node_count and node_count for PoS chains
		const [posRows] = await con.query(getPowerConsumptionDataForPoS);

		// TODO : fetch single_node_power_consumption, testnet_node_count and node_count for Proof of Work chains
		const powRows = [];

		posRows?.forEach((chain) => {
			chain.powerConsumption = calculatePowerConsumption(chain.single_node_power_consumption, chain.node_count, chain.testnet_node_count);
		});

		await updatePowerConsumptionInDb(con, [...posRows, ...powRows]);

		con.release();
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION END ==========', Date.now());
	}
}

// fetch addresses hundred by hundred then check if they are contracts and set the is_contract field in the database
async function checkIfAddressesAreContracts() {
	try {
		const con = await pool.getConnection();

		const [accountRows] = await con.query(getPublicAddressFromAccountWhereContractIsNull, [10]);

		const txPromises = accountRows.map(async ({ blockchain_id, public_address }) => {
			const provider = new ethers.providers.JsonRpcProvider(getRpcByChainId(blockchain_id));
			return provider.getCode(public_address).then((res) => {
				if (res === '0x') {
					return {
						blockchain_id: blockchain_id,
						public_address: public_address,
						is_contract: 0
					};
				} else {
					return {
						blockchain_id: blockchain_id,
						public_address: public_address,
						is_contract: 1
					};
				}
			});
		});

		const txResults = await Promise.all(txPromises);

		const updateDbPromises = txResults.map((txResult) =>
			con.query(updateIsContractInAccount, [txResult.is_contract, txResult.blockchain_id, txResult.public_address])
		);

		await Promise.all(updateDbPromises);

		con.release();

		setTimeout(() => {
			checkIfAddressesAreContracts();
		}, 500);
	} catch (err) {
		console.error('checkIfAddressesAreContracts', err);

		setTimeout(() => {
			checkIfAddressesAreContracts();
		}, 60 * 1000);
	}
}

async function startFetchData() {
	try {
		const con = await pool.getConnection();

		con.destroy();

		if (process.env.NODE_ENV !== 'production') {
			// updateNodeCount();
			// updateGasPrice();

			fetchEVMBlocksFor(chains.ethereum, pool);
			fetchEVMBlocksFor(chains.polygon, pool);
			fetchEVMBlocksFor(chains.bsc, pool);
			fetchEVMBlocksFor(chains.avalanche, pool);
			fetchEVMBlocksFor(chains.fantom, pool);

			// fetchBitcoinData(pool);

			// updateTokensCountForNetworks(pool);

			checkIfAddressesAreContracts();

			// TODO : replace by a websocket
			/*
			setInterval(() => {
				updateGasPrice();
			}, 60 * 1000);

			setInterval(() => {
				updateNodeCount();
			}, 10 * 60 * 1000);
			*/
		} else {
			// dev stuff
		}
	} catch {
		setTimeout(() => {
			startFetchData();
		}, 1 * 60 * 1000);
	}
}

app.listen(process.env.SERVER_PORT, async () => {
	console.log(`Server listening on port ${process.env.SERVER_PORT}`);

	pool = await createDbPool();

	startFetchData();
});
