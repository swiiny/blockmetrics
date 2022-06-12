import cors from 'cors';
import { ethers } from 'ethers';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { bitcoinTimeout, fetchBitcoinData, fetchEVMBlocksFor } from './utils/fetch/blocks.js';
import { updateTokenCountTimeout, updateTokensCountForNetworks } from './utils/fetch/coingecko.js';
import {
	fetchDailyActiveUsersFor,
	fetchDailyAverageBlockTime,
	fetchDailyAverageGasPrice,
	fetchDailyTransactionFor,
	fetchDailyUniqueAddressesFor,
	fetchDailyVerifiedContractsFor,
	fetchDifficultyFor,
	fetchHashrateFor
} from './utils/fetch/fetch.js';
import { getGasPrice } from './utils/fetch/gasPrice.js';
import {
	getAvalancheNodeCount,
	getBitcoinNodeCount,
	getBscNodeCount,
	getEthNodeCount,
	getFantomNodeCount
} from './utils/fetch/nodeCount.js';
import { calculatePowerConsumption, getRpcByChainId } from './utils/functions.js';
import { createDbPool } from './utils/pool/pool.js';
import {
	getPowerConsumptionDataForPoS,
	getPublicAddressFromAccountWhereContractIsNull,
	updateIsContractInAccount
} from './utils/sql.js';
import { updateDbGasPrice } from './utils/update/gasPrice.js';
import { updateDbNodeCount } from './utils/update/nodeCount.js';
import { updatePowerConsumptionInDb } from './utils/update/powerConsumption.js';
import { CHAINS } from './variables.js';
import schedule from 'node-schedule';

let intervalGasPrice;
let intervalNodeCount;
let timeoutFetchData;
let timeoutCheckIfaddresses;

let fetchingDataActivated = true;
let canStartFetchData = true;

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
				.then((res) => updateDbNodeCount(con, CHAINS.ethereum.id, res))
				.catch(() => null),
			getBscNodeCount()
				.then((res) => updateDbNodeCount(con, CHAINS.bsc.id, res))
				.catch(() => null),
			/*getPolygonNodeCount()
				.then((res) => updateDbNodeCount(con, CHAINS.polygon.id, res))
				.catch(() => null),*/
			getAvalancheNodeCount()
				.then((res) => updateDbNodeCount(con, CHAINS.avalanche.id, res))
				.catch(() => null),
			getBitcoinNodeCount()
				.then((res) => updateDbNodeCount(con, CHAINS.bitcoin.id, res))
				.catch(() => null),
			getFantomNodeCount()
				.then((res) => updateDbNodeCount(con, CHAINS.fantom.id, res))
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
		const promises = Object.values(CHAINS)
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
			chain.powerConsumption = calculatePowerConsumption(
				chain.single_node_power_consumption,
				chain.node_count,
				chain.testnet_node_count
			);
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
/*
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

		if (fetchingDataActivated) {
			timeoutCheckIfaddresses = setTimeout(() => {
				checkIfAddressesAreContracts();
			}, 1000);
		}
	} catch (err) {
		console.error('checkIfAddressesAreContracts', err);
		if (fetchingDataActivated) {
			timeoutCheckIfaddresses = setTimeout(() => {
				checkIfAddressesAreContracts();
			}, 60 * 1000);
		}
	}
}
*/

async function fetchDailyData() {
	const res = await fetchDailyActiveUsersFor(CHAINS.ethereum);

	console.log('fetchDailyActiveUsersFor', res);
}

async function startFetchData() {
	canStartFetchData = false;
	try {
		const con = await pool.getConnection();

		con.destroy();

		if (!fetchingDataActivated) {
			return 0;
		}

		if (process.env.NODE_ENV === 'production') {
			// updateNodeCount();
			// updateGasPrice();

			fetchEVMBlocksFor(CHAINS.ethereum, pool);
			fetchEVMBlocksFor(CHAINS.polygon, pool);
			fetchEVMBlocksFor(CHAINS.bsc, pool);
			fetchEVMBlocksFor(CHAINS.avalanche, pool);
			fetchEVMBlocksFor(CHAINS.fantom, pool);

			// fetchBitcoinData(pool);

			// updateTokensCountForNetworks(pool);

			checkIfAddressesAreContracts();

			// TODO : replace by a websocket
			/*
			intervalGasPrice = setInterval(() => {
				updateGasPrice();
			}, 60 * 1000);

			intervalNodeCount = setInterval(() => {
				updateNodeCount();
			}, 10 * 60 * 1000);
			*/
		} else {
			// dev stuff
			// fetchDailyUniqueAddressesFor(CHAINS.bitcoin);
			// fetchDailyTransactionFor(CHAINS.bitcoin);
			// fetchDailyAverageBlockTime(CHAINS.ethereum);
			// fetchDailyActiveUsersFor(CHAINS.avalanche);
			// fetchDailyAverageGasPrice(CHAINS.avalanche);
			// fetchDifficultyFor(CHAINS.bitcoin);
			// fetchHashrateFor(CHAINS.bitcoin);
			const res = await fetchDailyAverageGasPrice(CHAINS.ethereum);

			console.log('fetchDailyVerifiedContractsFor', res);

			const rule = new schedule.RecurrenceRule();
			rule.second = 30;

			const job = schedule.scheduleJob(rule, async () => {
				// fetchDailyData();
			});
		}
	} catch {
		console.error('catch error in startFetchData');
		if (canStartFetchData) {
			timeoutFetchData = setTimeout(() => {
				console.log('start fetch data');
				startFetchData();
			}, 1 * 60 * 1000);
		}
	}
}

app.get(`/v1/server/fetch/stop`, async (req, res) => {
	try {
		console.log('FETCHING DATA STOPPED');
		fetchingDataActivated = false;

		clearInterval(intervalGasPrice);
		clearInterval(intervalNodeCount);
		clearInterval(timeoutFetchData);
		clearInterval(timeoutCheckIfaddresses);

		// imported
		clearInterval(updateTokenCountTimeout);
		clearInterval(bitcoinTimeout);

		canStartFetchData = true;
		res.status(200).send('stop success');
	} catch (err) {
		res.status(500).send('trying to stop fetch data');
		return;
	}
});

app.get(`/v1/server/fetch/start`, async (req, res) => {
	try {
		if (canStartFetchData) {
			fetchingDataActivated = true;

			startFetchData();
			res.status(200).send('start success');
		} else {
			res.status(200).send("can't start");
		}
	} catch (err) {
		res.status(500).send('trying to start fetch data');
		return;
	}
});

app.listen(process.env.SERVER_PORT, async () => {
	console.log(`Server listening on port ${process.env.SERVER_PORT}`);

	pool = await createDbPool();

	console.log('start fetch data');
	startFetchData();
});

export { fetchingDataActivated };
