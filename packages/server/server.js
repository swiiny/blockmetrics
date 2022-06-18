import { getGasPrice } from './utils/fetch/gasPrice.js';
import { getNodeCountForAllBlockchains } from './utils/fetch/nodeCount.js';
import { calculatePowerConsumption } from './utils/functions.js';
import { createDbPool } from './utils/pool/pool.js';
import { getPowerConsumptionDataForPoS, resetTodayTransactionCount, updateTxCountInBlockchain } from './utils/sql.js';
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
	updateDbDailyTokenCount
} from './utils/update/dailyData.js';

import { getTokensCountForNetworks } from './utils/fetch/coingecko.js';
import {
	fetchDailyActiveUsersFor,
	fetchDailyAverageBlockTimeFor,
	fetchDailyAverageGasPriceFor,
	fetchDailyTokenCountFor,
	fetchDailyUniqueAddressesFor,
	fetchDailyVerifiedContractsFor,
	fetchDifficultyFor,
	fetchHashrateFor
} from './utils/fetch/fetch.js';
import { ethers } from 'ethers';
import { fetchEVMBlockFor } from './utils/fetch/blocks.js';

let fetchingDataActivated = true;
let canStartFetchData = true;

// schudeled job that fetch data every day at 00:00
let dailyRoutine;

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

	// updatePowerConsumption();

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
				if (data?.chartsData) {
					for (let i = 1; i < data.length; i++) {
						formattedData['chartsData'].push({
							timestamp: data[i].timestamp,
							count: data[i].count - data[i - 1].count
						});
					}
				}

				if (data?.total > 0) {
					formattedData.total = data.total;
				}

				return formattedData;
			})
			.then((formattedData) => {
				updateDbDailyNewAddresses(con, chain.id, formattedData.chartsData);
				con.query(updateTxCountInBlockchain, [formattedData.total, chain.id]);
				con.query(resetTodayTransactionCount, [chain.id]);
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
			// INIT WEBSOCKET PROVIDERS CONNECTIONS
			const con = await pool.getConnection();

			CHAINS_ARRAY.filter((chain) => chain.type === 'EVM').forEach((chain) => {
				console.log('start ws provider for', chain.name);
				const wsProvider = new ethers.providers.WebSocketProvider(chain.rpcWs);

				wsProvider.on('block', async (blockNumber) => {
					fetchEVMBlockFor(chain, wsProvider, blockNumber, con);
				});
			});

			// SET DAILY ROUTINE
			const rule = new schedule.RecurrenceRule();
			rule.hour = 2;
			rule.minute = 0;
			rule.tz = 'Europe/Amsterdam';

			dailyRoutine = schedule.scheduleJob(rule, async () => {
				console.log('run schedule');
				fetchDailyData();
			});
		} else {
			// dev stuff
			/*
			const con = await pool.getConnection();

			CHAINS_ARRAY.filter((chain) => chain.type === 'EVM').forEach((chain) => {
				const wsProvider = new ethers.providers.WebSocketProvider(chain.rpcWs);

				wsProvider.on('block', async (blockNumber) => {
					fetchEVMBlockFor(chain, wsProvider, blockNumber, con);
				});
			});
*/
			// fetchDailyData();
		}
	} catch (err) {
		console.error('catch error in startFetchData', err);
		if (canStartFetchData) {
			timeoutFetchData = setTimeout(() => {
				console.log('restart fetching data');
				dailyRoutine = null;
				// startFetchData();
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

export { fetchingDataActivated };
