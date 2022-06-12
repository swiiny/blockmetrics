import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { getGasPrice } from './utils/fetch/gasPrice.js';
import {
	getAvalancheNodeCount,
	getBitcoinNodeCount,
	getBscNodeCount,
	getEthNodeCount,
	getFantomNodeCount
} from './utils/fetch/nodeCount.js';
import { calculatePowerConsumption } from './utils/functions.js';
import { createDbPool } from './utils/pool/pool.js';
import { getPowerConsumptionDataForPoS } from './utils/sql.js';
import { updateDbGasPrice } from './utils/update/gasPrice.js';
import { updateDbNodeCount } from './utils/update/nodeCount.js';
import { updatePowerConsumptionInDb } from './utils/update/powerConsumption.js';
import { CHAINS, CHAINS_ARRAY } from './variables.js';
import schedule from 'node-schedule';
import {
	updateDbDailyActiveUsers,
	updateDbDailyAverageBlocktime,
	updateDbDailyAverageGasPrice,
	updateDbDailyDifficulty,
	updateDbDailyHashrate,
	updateDbDailyNewAddresses,
	updateDbDailyNewContracts,
	updateDbDailyNewTokens,
	updateDbDailyTokenCount
} from './utils/update/dailyData.js';

import { getTokensCountForNetworks } from './utils/fetch/coingecko.js';
import { fetchDailyTokenCount } from './utils/fetch/fetch.js';

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

		posRows?.forEach((chain) => {
			chain.powerConsumption = calculatePowerConsumption(
				chain.single_node_power_consumption,
				chain.node_count,
				chain.testnet_node_count
			);
		});

		await updatePowerConsumptionInDb(con, [...posRows, ...powRows]);

		// TODO : fetch single_node_power_consumption, testnet_node_count and node_count for Proof of Work chains
		const powRows = [];

		con.release();
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION END ==========', Date.now());
	}
}

async function fetchDailyData() {
	const delay = 5 * 1000;

	const con = await pool.getConnection();
	/*
	// prevent run at midnight
	await new Promise((resolve) => setTimeout(resolve, delay));


	const tokensCount = await getTokensCountForNetworks();

	tokensCount?.forEach(({ id, count }) => {
		updateDbDailyTokenCount(con, id, count);
	});

	if (!tokensCount) {
		console.error('getTokensCountForNetworks failed');
	}

	// await 15 minutes to be sure that the scrapped data is udpated
	await new Promise((resolve) => setTimeout(resolve, 15 * 60 * 1000));
*/
	CHAINS_ARRAY.forEach(async (chain) => {
		/*
		fetchDailyActiveUsersFor(chain)
			.then((data) => {
				if (data) {
					updateDbDailyActiveUsers(con, chain.id, data);
				}
			})
			.catch((err) => console.error(err));

			await new Promise((resolve) => setTimeout(resolve, delay));

				fetchDailyAverageBlockTime(chain)
				.then((data) => {
					if (data) {
						updateDbDailyAverageBlocktime(con, chain.id, data);
					}
				})
				.catch((err) => console.error(err));

await new Promise((resolve) => setTimeout(resolve, delay));			
		fetchDailyAverageGasPrice(chain)
				.then((data) => {
					if (data) {
						updateDbDailyAverageGasPrice(con, chain.id, data);
					}
				})
				.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		fetchDifficultyFor(chain)
				.then((data) => {
					if (data) {
						updateDbDailyDifficulty(con, chain.id, data);
					}
				})
				.catch((err) => console.error(err));

				

		await new Promise((resolve) => setTimeout(resolve, delay));
		
		fetchHashrateFor(chain)
			.then((data) => {
				if (data) {
					updateDbDailyHashrate(con, chain.id, data);
				}
			})
			.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		
		fetchDailyUniqueAddressesFor(chain)
			.then((data) => {
				const formattedData = [];
				if (data) {
					for (let i = 1; i < data.length; i++) {
						formattedData.push({
							timestamp: data[i].timestamp,
							count: data[i].count - data[i - 1].count
						});
					}
				}

				return formattedData;
			})
			.then((formattedData) => {
				updateDbDailyNewAddresses(con, chain.id, formattedData);
			})
			.catch((err) => console.error(err));

		
		await new Promise((resolve) => setTimeout(resolve, delay));

		fetchDailyVerifiedContractsFor(chain)
			.then((data) => {
				if (data) {
					updateDbDailyNewContracts(con, chain.id, data);
				}
			})
			.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		*/

		if (chain.id !== CHAINS.bitcoin.id) {
			fetchDailyTokenCount(chain, con)
				.then((data) => {
					let formattedData = null;
					if (data?.length > 1) {
						formattedData = [];

						for (let i = 1; i < data.length; i++) {
							formattedData.push({
								date: data[i].date,
								count: data[i].token_count - data[i - 1].token_count
							});
						}
					}

					return formattedData;
				})
				.then((formattedData) => {
					updateDbDailyNewTokens(con, chain.id, formattedData);
				})
				.catch((err) => console.error(err));

			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	});
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
			// TODO : replace by a websocket
			/*
			intervalGasPrice = setInterval(() => {
				updateGasPrice()
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
			const rule = new schedule.RecurrenceRule();
			rule.second = 30;

			fetchDailyData();

			const job = schedule.scheduleJob(rule, async () => {
				//fetchDailyData();
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
		// clearInterval(bitcoinTimeout);

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

	startFetchData();
});

export { fetchingDataActivated };
