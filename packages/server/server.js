import { getGasPrice } from './utils/fetch/gasPrice.js';
import { getNodeCountForAllBlockchains } from './utils/fetch/nodeCount.js';
import { calculatePowerConsumption } from './utils/functions.js';
import { createDbPool } from './utils/pool/pool.js';
import {
	getPowerConsumptionDataForPoS,
	getTodayActiveAddressCount,
	removeYesterdayAddressFromTodayActiveAddress,
	resetTodayAddressCount,
	resetTodayTransactionCount,
	updateAddressCountInBlockchain,
	updateTodayAddressCountInBlockchain,
	updateTxCountInBlockchain
} from './utils/sql.js';
import { updateDbGasPrice } from './utils/update/gasPrice.js';
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
	updateDbDailyNodeCount,
	updateDbDailyTokenCount,
	updateDbDailyTransaction
} from './utils/update/dailyData.js';

import { getTokensCountForNetworks } from './utils/fetch/coingecko.js';
import {
	fetchDailyActiveUsersFor,
	fetchDailyAverageBlockTimeFor,
	fetchDailyAverageGasPriceFor,
	fetchDailyTokenCountFor,
	fetchDailyTransactionFor,
	fetchDailyUniqueAddressesFor,
	fetchDailyVerifiedContractsFor,
	fetchDifficultyFor,
	fetchHashrateFor
} from './utils/fetch/fetch.js';
import { ethers } from 'ethers';
import { fetchEVMBlockFor } from './utils/fetch/blocks.js';
import { fetchBitcoinData } from './utils/fetch/bitcoin.js';

let fetchingDataActivated = true;
let canStartFetchData = true;

// schudeled job that fetch data every day at 00:00
let dailyRoutine;
let fiveMinutesRoutine;

let wsProviders = [];

let pool;

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
		console.log('========== UPDATE POWER CONSUMPTION START ==========', Date.now());
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

		// TODO : fetch single_node_power_consumption, testnet_node_count and node_count for Proof of Work chains
		const powRows = [];

		await updatePowerConsumptionInDb(con, [...posRows, ...powRows]);

		con.release();
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION END ==========', Date.now());
	}
}

async function fetchDailyData(noDelay = false) {
	const delay = noDelay ? 0 : 5000;

	const con = await pool.getConnection();

	/* ========================================
	 FETCH AND UPDATE TOKEN COUNT PER BLOCKCHAINS
	 ======================================== */

	const tokensCount = await getTokensCountForNetworks();

	tokensCount?.forEach(({ id, count }) => {
		updateDbDailyTokenCount(con, id, count);
	});

	if (!tokensCount) {
		console.error('getTokensCountForNetworks failed');
	}

	/* ========================================
	 FETCH AND UPDATE NODE COUNT PER BLOCKCHAINS
	 ======================================== */

	const nodesCount = await getNodeCountForAllBlockchains();

	const nodesCountPromises = nodesCount?.map(({ id, count }) => {
		updateDbDailyNodeCount(con, id, count);
	});

	if (!nodesCount) {
		console.error('getNodeCountForAllBlockchains failed');
	}

	await Promise.all(nodesCountPromises);

	// fetch and update blockchains power consumption
	updatePowerConsumption();

	/* ========================================
	 REMOVE yesterday active addresses
	 ======================================== */
	await con.query(removeYesterdayAddressFromTodayActiveAddress);

	// wait 15 minutes to be sure that the scrapped data is udpated
	await new Promise((resolve) => setTimeout(resolve, noDelay ? 0 : 15 * 60 * 1000));

	CHAINS_ARRAY.forEach(async (chain) => {
		/* ========================================
	 FETCH AND UPDATE ACTIVE USERS
	 ======================================== */

		fetchDailyActiveUsersFor(chain)
			.then((data) => {
				if (data) {
					updateDbDailyActiveUsers(con, chain.id, data);
				}
			})
			.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		/* ========================================
	 FETCH AND UPDATE AVERAGE BLOCKTIME 
	 ======================================== */

		fetchDailyTransactionFor(chain)
			.then((data) => {
				return data;
			})
			.then((formattedData) => {
				if (formattedData.chartsData.length > 0) {
					updateDbDailyTransaction(con, chain.id, formattedData.chartsData);
				}

				if (formattedData.total > 0) {
					con.query(updateTxCountInBlockchain, [formattedData.total, chain.id]);
					con.query(resetTodayTransactionCount, [chain.id]);
				}
			})
			.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		/* ========================================
	 FETCH AND UPDATE AVERAGE BLOCKTIME 
	 ======================================== */
		fetchDailyAverageBlockTimeFor(chain)
			.then((data) => {
				if (data) {
					updateDbDailyAverageBlocktime(con, chain.id, data);
				}
			})
			.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		/* ========================================
	 FETCH AND UPDATE AVERAGE GAS PRICE
	 ======================================== */

		if (chain.type === 'EVM') {
			fetchDailyAverageGasPriceFor(chain)
				.then((data) => {
					if (data) {
						updateDbDailyAverageGasPrice(con, chain.id, data);
					}
				})
				.catch((err) => console.error(err));

			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		/* ========================================
	 FETCH AND UPDATE DIFFICULTY FOR POW CHAINS
	 ======================================== */

		if (chain.consensus === 'POW') {
			fetchDifficultyFor(chain)
				.then((data) => {
					if (data) {
						updateDbDailyDifficulty(con, chain.id, data);
					}
				})
				.catch((err) => console.error(err));

			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		/* ========================================
	 FETCH AND UPDATE HASHRATE FOR POW CHAINS
	 ======================================== */
		fetchHashrateFor(chain)
			.then((data) => {
				if (data) {
					updateDbDailyHashrate(con, chain.id, data);
				}
			})
			.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		/* ========================================
	 FETCH AND UPDATE UNIQUE ADDRESSES
	 ======================================== */
		fetchDailyUniqueAddressesFor(chain)
			.then((data) => {
				const formattedData = {
					chartsData: [],
					total: null
				};
				const { chartsData, total } = data || {};

				if (chartsData) {
					for (let i = 1; i < chartsData.length; i++) {
						formattedData['chartsData'].push({
							timestamp: chartsData[i].timestamp,
							count: chartsData[i].count - chartsData[i - 1].count
						});
					}
				}

				if (total > 0) {
					formattedData.total = total;
				}

				return formattedData;
			})
			.then((formattedData) => {
				if (formattedData.chartsData.length > 0) {
					updateDbDailyNewAddresses(con, chain.id, formattedData.chartsData);
				}

				if (formattedData.total) {
					con.query(updateAddressCountInBlockchain, [formattedData.total, chain.id]);
					con.query(resetTodayAddressCount, [chain.id]);
				}
			})
			.catch((err) => console.error(err));

		await new Promise((resolve) => setTimeout(resolve, delay));

		/* ========================================
	 FETCH AND UPDATE NEW SMART CONTRACTS
	 ======================================== */
		if (chain.id !== CHAINS.bitcoin.id) {
			fetchDailyVerifiedContractsFor(chain)
				.then((data) => {
					if (data) {
						updateDbDailyNewContracts(con, chain.id, data);
					}
				})
				.catch((err) => console.error(err));

			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		/* ========================================
	 FETCH AND UPDATE NEW TOKENS COUNT
	 ======================================== */
		if (chain.id !== CHAINS.bitcoin.id) {
			fetchDailyTokenCountFor(chain, con)
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

			console.log('end fetching daily data for', chain.name);
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
			console.log('start production');

			// INIT WEBSOCKET PROVIDERS CONNECTIONS
			const con = await pool.getConnection();

			CHAINS_ARRAY.filter((chain) => chain.type === 'EVM').forEach((chain) => {
				console.log('start ws provider for', chain.name);

				const wsProvider = new ethers.providers.WebSocketProvider(chain.rpcWs);

				wsProvider.on('block', async (blockNumber) => {
					fetchEVMBlockFor(chain, wsProvider, blockNumber, con);
				});
			});

			// INIT BITCOIN WEBSOCKET PROVIDER
			fetchBitcoinData(pool);

			// SET DAILY ROUTINE
			const rule = new schedule.RecurrenceRule();
			rule.hour = 2;
			rule.minute = 0;
			rule.tz = 'Europe/Amsterdam';

			dailyRoutine = schedule.scheduleJob(rule, async () => {
				console.log('run schedule');
				fetchDailyData();
			});

			const ruleFiveMinutes = new schedule.RecurrenceRule();
			ruleFiveMinutes.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 56, 57];

			fiveMinutesRoutine = schedule.scheduleJob(ruleFiveMinutes, async () => {
				CHAINS_ARRAY.forEach(async (chain) => {
					const [todayActiveAddressCount] = await con.query(getTodayActiveAddressCount, [chain.id]);
					if (todayActiveAddressCount[0].count > 0) {
						con.query(updateTodayAddressCountInBlockchain, [todayActiveAddressCount[0].count, chain.id]);
					}
				});
			});
		} else {
			// dev stuff
			console.log('start dev');

			const con = await pool.getConnection();

			fetchBitcoinData(pool);

			// const chain = CHAINS.avalanche;

			/*
			const nodesCount = await getNodeCountForAllBlockchains();

			const nodesCountPromises = nodesCount?.map(({ id, count }) => {
				updateDbDailyNodeCount(con, id, count);
			});

			if (!nodesCount) {
				console.error('getNodeCountForAllBlockchains failed');
			}

			await Promise.all(nodesCountPromises);

			// fetch and update blockchains power consumption
			updatePowerConsumption();
			*/
		}
	} catch (err) {
		console.error('catch error in startFetchData', err);
		if (canStartFetchData) {
			timeoutFetchData = setTimeout(async () => {
				console.log('restart fetching data');

				// remove all items from wsProviders
				wsProviders.forEach((wsProvider) => {
					wsProvider.removeAllListeners();
				});

				wsProviders = [];

				const promises = [dailyRoutine.gracefulShutdown(), fiveMinutesRoutine.gracefulShutdown()];

				await Promise.all(promises);

				startFetchData();
			}, 1 * 60 * 1000);
		}
	}
}

async function init() {
	console.log(`Server running on port ${process.env.SERVER_PORT}`);

	pool = await createDbPool();

	startFetchData();
}

init();

process.on('SIGINT', async () => {
	const promises = [dailyRoutine.gracefulShutdown(), fiveMinutesRoutine.gracefulShutdown()];
	await Promise.all(promises);

	process.exit(0);
});

export { fetchingDataActivated };
