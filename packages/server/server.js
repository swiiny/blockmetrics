'use strict';

import { getNodeCountForAllBlockchains } from './utils/fetch/posNodeCount.js';
import { calculatePowerConsumptionPoS } from './utils/functions.js';
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
import { getTxPowerConsumptionForPoWChains } from './utils/fetch/powTxPowerConsumption.js';

let fetchingDataActivated = true;
let canStartFetchData = true;

// schudeled job that fetch data every day at 00:00
let dailyRoutine;
let middayRoutine;
let fiveMinutesRoutine;

let wsProviders = [];

let pool;

async function updatePowerConsumptionPoS() {
	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION POS TART ==========', Date.now());
	}

	const con = await pool.getConnection();

	try {
		// fetch single_node_power_consumption, testnet_node_count and node_count for PoS chains
		const [posRows] = await con.query(getPowerConsumptionDataForPoS);

		posRows?.forEach((chain) => {
			chain.powerConsumption = calculatePowerConsumptionPoS(
				chain.single_node_power_consumption,
				chain.node_count,
				chain.testnet_node_count
			);
		});

		await updatePowerConsumptionInDb(con, posRows);

		con.release();
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION POS END ==========', Date.now());
	}
}

async function updatePowerConsumptionPoW(chainsPowerConsumption) {
	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION POW START ==========', Date.now());
	}

	const con = await pool.getConnection();

	try {
		await updatePowerConsumptionInDb(con, chainsPowerConsumption);

		con.release();
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION POW END ==========', Date.now());
	}
}

async function updatePowerConsumtion() {
	try {
		// fetch and update blockchains power consumption
		updatePowerConsumptionPoS();

		// FETCH AND UPDATE POWER CONSUMPTION FOR PoW CHAIN
		const transactionPowerConsumption = await getTxPowerConsumptionForPoWChains();

		// fetch and update blockchains power consumption
		updatePowerConsumptionPoW(transactionPowerConsumption);
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}
}

async function fetchDailyData(factor = 1) {
	const delay = 5000 * factor;

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

	/* ========================================
	 REMOVE yesterday active addresses
	 ======================================== */
	await con.query(removeYesterdayAddressFromTodayActiveAddress);

	// wait 20 minutes to be sure that the scrapped data is udpated
	await new Promise((resolve) => setTimeout(resolve, 10 * 60 * 1000 * factor));

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

async function initWebsocketProvider(chain, con) {
	let pingTimeout = null;
	let keepAliveInterval = null;

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('WS opened', chain.name);
	}

	let wsProvider = new ethers.providers.WebSocketProvider(chain.rpcWs);

	wsProvider.on('block', async (blockNumber) => {
		if (chain.id === CHAINS.avalanche.id) {
			//console.log('Avalanche block:', blockNumber);
			// wait a second to be sure that the block is fully processed (mainly avalanche issue)
			setTimeout(
				() => {
					fetchEVMBlockFor(chain, wsProvider, blockNumber, con);
				},
				process.env.NODE_ENV === 'production' ? 3000 : 0
			);
		} else {
			fetchEVMBlockFor(chain, wsProvider, blockNumber, con);
		}
	});

	// check each 7.5 seconds if websocket is still connected
	wsProvider._websocket.on('open', () => {
		keepAliveInterval = setInterval(() => {
			wsProvider._websocket.ping();

			pingTimeout = setTimeout(() => {
				wsProvider._websocket.terminate();
			}, 15000);
		}, 7500);
	});

	wsProvider._websocket.on('close', (err) => {
		if (keepAliveInterval) {
			clearInterval(keepAliveInterval);
		}

		if (pingTimeout) {
			clearTimeout(pingTimeout);
		}

		// get current date with hour and minutes
		const date = new Date();
		const dateString = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('WS closed', chain.name, dateString);
		}

		wsProvider.removeAllListeners();
		wsProvider._websocket?.removeAllListeners();

		keepAliveInterval = null;
		pingTimeout = null;

		// remove this wsProvider from wsProviders
		wsProviders = wsProviders.filter((ws) => ws.connection.url !== wsProvider.connection.url.ws);

		// try to reconnect every 30 seconds
		setTimeout(() => {
			wsProvider = null;
			initWebsocketProvider(chain, con);
		}, 30 * 1000);
	});

	wsProvider._websocket.on('pong', () => {
		if (pingTimeout) {
			clearInterval(pingTimeout);
		}
	});

	wsProviders.push(wsProvider);
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

				initWebsocketProvider(chain, con);
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

			const ruleMidday = new schedule.RecurrenceRule();
			ruleMidday.hour = 12;
			ruleMidday.minute = 0;
			ruleMidday.tz = 'Europe/Amsterdam';

			middayRoutine = schedule.scheduleJob(ruleMidday, async () => {
				console.log('run schedule');
				updatePowerConsumtion();
			});

			const ruleFiveMinutes = new schedule.RecurrenceRule();
			ruleFiveMinutes.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

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

			//console.log(await fetchDailyTransactionFor(CHAINS.polygon));

			//fetchDailyData(1 / 10);

			// INIT WEBSOCKET PROVIDERS CONNECTIONS
			const con = await pool.getConnection();

			CHAINS_ARRAY.filter((chain) => chain.type === 'EVM').forEach(async (chain) => {
				console.log('start ws provider for', chain.name);

				try {
					initWebsocketProvider(chain, con);
				} catch {
					console.error('error connecting to ws provider for', chain.name, err);
				}
			});

			// INIT BITCOIN WEBSOCKET PROVIDER
			fetchBitcoinData(pool);

			// SET DAILY ROUTINE
			const rule = new schedule.RecurrenceRule();
			//rule.hour = 2;
			rule.minute = [0, 30];
			rule.tz = 'Europe/Amsterdam';

			dailyRoutine = schedule.scheduleJob(rule, async () => {
				console.log('run schedule');
				fetchDailyData(1 / 10);
			});

			const ruleFiveMinutes = new schedule.RecurrenceRule();
			ruleFiveMinutes.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
			// ruleFiveMinutes.minute = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56,58];

			fiveMinutesRoutine = schedule.scheduleJob(ruleFiveMinutes, async () => {
				CHAINS_ARRAY.forEach(async (chain) => {
					const [todayActiveAddressCount] = await con.query(getTodayActiveAddressCount, [chain.id]);
					if (todayActiveAddressCount[0].count > 0) {
						con.query(updateTodayAddressCountInBlockchain, [todayActiveAddressCount[0].count, chain.id]);
					}
				});
			});
		}
	} catch (err) {
		console.error('catch error in startFetchData', err);
		if (canStartFetchData) {
			timeoutFetchData = setTimeout(async () => {
				console.log('restart fetching data');

				// remove all items from wsProviders
				wsProviders.forEach((wsProvider) => {
					wsProvider.removeAllListeners();
					wsProvider._websocket?.removeAllListeners();
				});

				wsProviders = [];

				const promises = [
					dailyRoutine.gracefulShutdown(),
					fiveMinutesRoutine.gracefulShutdown(),
					middayRoutine.gracefulShutdown()
				];

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

process.on('uncaughtException', function (err) {
	console.log('UNCAUGHT EXCEPTION - keeping process alive:', err.message);
});

export { fetchingDataActivated };
