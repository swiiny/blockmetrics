'use strict';

import { getNodeCountForAllBlockchains } from './utils/fetch/posNodeCount.js';
import {
	calculatePowerConsumptionPoS,
	getRankFromScore,
	getRpcByChainId,
	getWsRpcByChainId
} from './utils/functions.js';
import { createDbPool } from './utils/pool/pool.js';
import {
	getPowerConsumptionDataForPoS,
	getTodayActiveAddressesWhenIsContractIsNull,
	getTodayActiveContractCount,
	getTodayActiveUsersCount,
	insertDailyTvlConsumption,
	removeYesterdayAddressFromTodayActiveAddress,
	resetTodayAddressCount,
	resetTodayTransactionCount,
	updateAddressCountInBlockchain,
	updateBlockchainsRankingInBlockchainScore,
	updateScoreInBlockchain,
	updateTodayActiveAddressIsContract,
	updateTodayAddressUsersAndContractCountInBlockchain,
	updateTotalValueLockedInBlockchain,
	updateTxCountInBlockchain
} from './utils/sql.js';
import { updatePowerConsumptionInDb } from './utils/update/powerConsumption.js';
import { CHAINS, CHAINS_ARRAY, CHAINS_RPC } from './variables.js';
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
	updateDbDailyNodeCountAndReliability,
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
	fetchHashrateFor,
	fetchScoreCalculationData,
	fetchTotalValueLockedForAllChains,
	getActiveUsersCountForAllBlockchains
} from './utils/fetch/fetch.js';
import { ethers } from 'ethers';
import { fetchEVMBlockFor } from './utils/fetch/blocks.js';
import { fetchBitcoinData } from './utils/fetch/bitcoin.js';
import { getTxPowerConsumptionForPoWChains } from './utils/fetch/powTxPowerConsumption.js';
import { calculateScoreForChains, getWeightedAverageOf } from './utils/maths.js';
import axios from 'axios';

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
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}

	con.release();

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('========== UPDATE POWER CONSUMPTION POW END ==========', Date.now());
	}
}

async function updatePowerConsumption() {
	try {
		// fetch and update blockchains power consumption
		updatePowerConsumptionPoS();

		// FETCH AND UPDATE POWER CONSUMPTION FOR PoW CHAIN
		const transactionPowerConsumption = await getTxPowerConsumptionForPoWChains();

		// fetch and update blockchains power consumption
		await updatePowerConsumptionPoW(transactionPowerConsumption);

		/* ========================================
	 UPDATE SCORE FOR BLOCKCHAINS
	 ======================================== */

		const con = await pool.getConnection();

		await updateBlockchainsRanking(con);

		con.release();
	} catch (err) {
		console.error('updatePowerConsumption', err);
	}
}

async function fetchAndUpdateTVL(con) {
	try {
		const chainsTvl = await fetchTotalValueLockedForAllChains();

		// get timestamp of yesterday
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

		// get timestamp of yesterday at  midnight
		const timestamp = Math.floor(new Date(yesterday).setHours(0, 0, 0, 0) / 1000);

		const promises = chainsTvl
			.map(async ({ id, tvl }) => {
				const uuid = `${id}-${timestamp}`;

				return [
					con.query(updateTotalValueLockedInBlockchain, [tvl, id]),
					con.query(insertDailyTvlConsumption, [uuid, id, tvl, timestamp])
				];
			})
			.flat(1);

		await Promise.all(promises);
	} catch (err) {
		console.error('fetchAndUpdateTVL', err);
	}
}

async function updateBlockchainsRanking(con) {
	try {
		let blockchainsRows = await fetchScoreCalculationData(con);

		// calc score for token_count
		blockchainsRows = calculateScoreForChains(blockchainsRows, 'token_count');

		// calc score for average_transaction_count for the 30 last days
		blockchainsRows = calculateScoreForChains(blockchainsRows, 'average_transaction_count');

		// calc score for power_consumption
		blockchainsRows = calculateScoreForChains(blockchainsRows, 'blockchain_power_consumption', undefined, true);

		// calc score for total_value_locked
		blockchainsRows = calculateScoreForChains(blockchainsRows, 'total_value_locked');

		// assuming that 5 years old blockchains are mature
		const maxScoreDay = 5 * 365;

		// calc average of all scores
		blockchainsRows.forEach((chain) => {
			// get days count from chain.genesis_block
			const daysCount = Math.floor((Date.now() - chain.genesis_block) / (1000 * 60 * 60 * 24));

			let maturityScore = daysCount / maxScoreDay;

			if (maturityScore > 1) {
				maturityScore = 1;
			}

			maturityScore *= 100;

			// bitcoin has no total_value_locked but has a score of 100 because this blockchain is considered as mature
			let tvlRes = chain.id === CHAINS.bitcoin.id ? 100 : chain.total_value_locked_res;

			const proofOfTrustScore = (maturityScore + tvlRes) / 2;

			// floor to 0 decimal places
			chain.proof_of_trust_res = Math.floor(proofOfTrustScore);

			const score = getWeightedAverageOf([
				{
					weight: 10,
					value: chain.blockchain_power_consumption_res
				},
				{
					weight: 6,
					value: chain.proof_of_trust_res
				},
				{
					weight: 5,
					value: chain.reliability
				},
				{
					weight: 3,
					value: chain.token_count_res
				},
				{
					weight: 1,
					value: chain.average_transaction_count_res
				}
			]);

			chain.score = score;
			chain.rank = getRankFromScore(score);
		});

		// update blockchains ranking
		blockchainsRows.map(
			async ({
				id,
				rank,
				score,
				reliability,
				token_count_res,
				blockchain_power_consumption_res,
				total_value_locked_res,
				proof_of_trust_res,
				average_transaction_count_res
			}) => {
				con.query(updateBlockchainsRankingInBlockchainScore, [
					rank,
					score,
					reliability,
					token_count_res,
					blockchain_power_consumption_res,
					total_value_locked_res,
					proof_of_trust_res,
					average_transaction_count_res,
					id
				]);
				con.query(updateScoreInBlockchain, [score, id]);
			}
		);
	} catch (err) {
		console.error('updateBlockchainsRanking', err);
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

	// assuming that with 2000 nodes the blockchain is considered as reliable
	const chainsWithReliability = calculateScoreForChains(nodesCount, 'count', 2000);

	const nodesCountPromises = chainsWithReliability?.map(({ id, count, count_res }) => {
		updateDbDailyNodeCountAndReliability(con, id, count, count_res);
	});

	if (!nodesCount) {
		console.error('getNodeCountForAllBlockchains failed');
	}

	await Promise.all(nodesCountPromises);

	/* ========================================
	 COUNT ACTIVE USERS BY BLOCKCHAINS
	 ======================================== */
	const activeUsers = await getActiveUsersCountForAllBlockchains(con);

	console.log('activeUsers', activeUsers);

	// get timestamp of yesterday
	const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

	// get timestamp of yesterday at  midnight
	const timestamp = Math.floor(new Date(yesterday).setHours(0, 0, 0, 0) / 1000);

	const activeUsersPromises = activeUsers?.map(({ id, count }) => {
		return updateDbDailyActiveUsers(con, id, [{ timestamp, count }]);
	});

	await Promise.all(activeUsersPromises);

	/* ========================================
	 REMOVE yesterday active addresses
	 ======================================== */
	await con.query(removeYesterdayAddressFromTodayActiveAddress);

	/* ========================================
	 FETCH AND UPDATE TOTAL VALUE LOCKED FOR ALL CHAINS
	 ======================================== */
	await fetchAndUpdateTVL(con);

	// wait 10 minutes to be sure that the scrapped data is udpated
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

	/* ========================================
	 UPDATE SCORE FOR BLOCKCHAINS
	 ======================================== */

	await updateBlockchainsRanking(con);

	con.release();
}

async function initWebsocketProvider(chain, con) {
	let pingTimeout = null;
	let keepAliveInterval = null;

	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('WS opened', chain.name);
	}

	let wsProvider = new ethers.providers.WebSocketProvider(chain.rpcWs);

	wsProvider.on('block', async (blockNumber) => {
		/* uncomment if use Ankr node
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
		}
		*/
		fetchEVMBlockFor(chain, wsProvider, blockNumber, con);
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

	wsProvider._websocket.on('close', async (err) => {
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

		await wsProvider?._websocket?.terminate();
		await wsProvider?.destroy();

		keepAliveInterval = null;
		pingTimeout = null;

		wsProviders?.forEach(async (wsP) => {
			if (wsP.id === chain.id) {
				wsP.wsProvider.removeAllListeners();
				wsP.wsProvider._websocket?.removeAllListeners();

				await wsP.wsProvider?._websocket?.terminate();
				await wsP.wsProvider?.destroy();
				wsP.wsProvider = null;
			}
		});

		// remove this wsProvider from wsProviders
		wsProviders = wsProviders?.filter((ws) => ws.id !== chain.id) || [];

		console.log('WS provider removed from wsProviders', chain.id);
		// try to reconnect every 30 seconds
		wsProvider = null;

		// wait 30 seconds
		await new Promise((resolve) => setTimeout(resolve, 30000));

		initWebsocketProvider(chain, con);
	});

	wsProvider._websocket.on('pong', () => {
		if (pingTimeout) {
			clearInterval(pingTimeout);
		}
	});

	wsProviders?.push({
		id: chain.id,
		wsProvider: wsProvider
	});
}

// fetch addresses hundred by hundred then check if they are contracts and set the is_contract field in the database
async function checkIfAddressesAreContracts(con) {
	try {
		const addressesToFetchByBlockchain = 20;

		let chainsId = CHAINS_ARRAY.map((chain) => chain.id);

		if (process.env.NODE_ENV === 'development') {
			// avalanche is not fetched in local because of the ankr api not working without delay
			chainsId.filter((id) => id !== CHAINS.avalanche.id);
		}

		const accountRowsPromises = chainsId.map(async (chainId) => {
			if (chainId !== CHAINS.bitcoin.id) {
				const [accountRows] = await con.query(getTodayActiveAddressesWhenIsContractIsNull, [
					chainId,
					addressesToFetchByBlockchain
				]);

				return accountRows;
			} else {
				return null;
			}
		}, []);

		const resolvedAccountRows = (await Promise.all(accountRowsPromises)).flat(1).filter((row) => row !== null);

		// separate addresses by chain
		const addressesByChain = {};
		resolvedAccountRows?.forEach((row) => {
			if (!row.blockchain_id) {
				return;
			}

			if (!addressesByChain[row.blockchain_id]) {
				addressesByChain[row.blockchain_id] = [];
			}

			addressesByChain[row.blockchain_id].push(row.address);
		});

		Object.keys(addressesByChain)?.forEach(async (chainId) => {
			// const provider = new ethers.providers.JsonRpcProvider(CHAINS_RPC[chainId].rpc);
			//const provider = new ethers.providers.WebSocketProvider(CHAINS_RPC[chainId].rpcWs);
			const provider = wsProviders?.find((ws) => ws.id === chainId)?.wsProvider;

			if (!provider) {
				return;
			}

			addressesByChain[chainId]?.map(async (address, i) => {
				const res = await provider.getCode(address);
				const isContract = res === '0x' ? 0 : 1;

				await new Promise((resolve) => setTimeout(resolve, i * (1000 / addressesToFetchByBlockchain)));

				//console.log('add new contract info for address', address, isContract, chainId);
				return con.query(updateTodayActiveAddressIsContract, [isContract, chainId, address]);
			});
		});

		return 0;
	} catch (err) {
		console.error('checkIfAddressesAreContracts', err);
		return 1;
	}
}

async function startFetchData() {
	try {
		let con = await pool.getConnection();

		if (process.env.NODE_ENV === 'production') {
			console.log('start production');

			// INIT WEBSOCKET PROVIDERS CONNECTIONS
			CHAINS_ARRAY.filter((chain) => chain.type === 'EVM').forEach((chain) => {
				console.log('start ws provider for', chain.name);

				try {
					initWebsocketProvider(chain, con);
				} catch (err) {
					console.error('error connecting to ws provider for', chain.name, err);
				}
			});

			// INIT BITCOIN WEBSOCKET PROVIDER
			fetchBitcoinData(pool);

			/*
			console.log('start checkIfAddressesAreContracts');
			// fetch new used addresses and check if they are contracts or not
			setInterval(() => {
				checkIfAddressesAreContracts(con);
			}, 1010);
*/
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
				updatePowerConsumption();
			});

			const ruleFiveMinutes = new schedule.RecurrenceRule();
			//ruleFiveMinutes.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
			ruleFiveMinutes.second = 30;

			fiveMinutesRoutine = schedule.scheduleJob(ruleFiveMinutes, async () => {
				CHAINS_ARRAY.forEach(async (chain) => {
					const [todayActiveContract] = await con.query(getTodayActiveContractCount, [chain.id]);
					const [todayActiveUsers] = await con.query(getTodayActiveUsersCount, [chain.id]);

					const contractCount = todayActiveContract[0]?.count || 0;
					const usersCount = todayActiveUsers[0]?.count || 0;

					const newAddressCount = contractCount + usersCount;

					con.query(updateTodayAddressUsersAndContractCountInBlockchain, [
						newAddressCount,
						contractCount,
						usersCount,
						chain.id
					]);
				});
			});
		} else {
			// dev stuff

			console.log('start dev');

			CHAINS_ARRAY.filter((chain) => chain.type === 'EVM').forEach(async (chain) => {
				console.log('start ws provider for', chain.name);

				try {
					initWebsocketProvider(chain, con);
				} catch (err) {
					console.error('error connecting to ws provider for', chain.name, err);
				}
			});

			// INIT BITCOIN WEBSOCKET PROVIDER
			fetchBitcoinData(pool);

			// SET DAILY ROUTINE
			const rule = new schedule.RecurrenceRule();
			rule.minute = [0, 10, 20, 30, 40, 50];
			rule.tz = 'Europe/Amsterdam';

			dailyRoutine = schedule.scheduleJob(rule, async () => {
				console.log('run schedule');
				fetchDailyData(1 / 10);
			});

			/*
				Can't work if run before 12:00
				const ruleMidday = new schedule.RecurrenceRule();
				ruleMidday.minute = [5, 15, 25, 35, 45, 55];
				ruleMidday.tz = 'Europe/Amsterdam';

				middayRoutine = schedule.scheduleJob(ruleMidday, async () => {
					console.log('run schedule');
					updatePowerConsumption();
				});
			*/

			const ruleFiveMinutes = new schedule.RecurrenceRule();
			ruleFiveMinutes.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

			fiveMinutesRoutine = schedule.scheduleJob(ruleFiveMinutes, async () => {
				CHAINS_ARRAY.forEach(async (chain) => {
					const [todayActiveContract] = await con.query(getTodayActiveContractCount, [chain.id]);
					const [todayActiveUsers] = await con.query(getTodayActiveUsersCount, [chain.id]);

					const contractCount = todayActiveContract[0]?.count || 0;
					const usersCount = todayActiveUsers[0]?.count || 0;

					const newAddressCount = contractCount + usersCount;
					con.query(updateTodayAddressUsersAndContractCountInBlockchain, [
						newAddressCount,
						contractCount,
						usersCount,
						chain.id
					]);
				});
			});

			setInterval(() => {
				checkIfAddressesAreContracts(con);
			}, 10 * 1000); // 100 seconds in dev to prevent high api calls
		}
	} catch (err) {
		console.error('catch error in startFetchData', err);
		// wait 10 seconds before go to next things

		// remove all items from wsProviders
		wsProviders.forEach((wsProvider) => {
			wsProvider.removeAllListeners();
			wsProvider._websocket?.removeAllListeners();
		});

		await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

		console.log('restart fetching data');

		wsProviders = null;
		dailyRoutine = null;
		fiveMinutesRoutine = null;
		middayRoutine = null;

		/*
		const promises = [
			dailyRoutine.gracefulShutdown(),
			fiveMinutesRoutine.gracefulShutdown(),
			middayRoutine.gracefulShutdown()
		];

		await Promise.all(promises);
*/
		startFetchData();
	}
}

async function init() {
	console.log(`Server running`);

	pool = await createDbPool();

	startFetchData();

	// check memory usage every 5 minutes, used to prevent high cost on jelastic cloud instance
	setInterval(async () => {
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		const mem = Math.round(used * 100) / 100;

		console.log('Memory usage: ' + mem + ' MB');

		if (mem >= 1024) {
			console.log('Restart server ========>');

			if (process.env.NODE_ENV === 'production') {
				const now = new Date();
				const hour = now.getHours();
				const minutes = now.getMinutes();

				// prevent restarting the server near a scheduled task
				if ((hour !== 2 && hour !== 12) || (minutes > 30 && minutes < 50)) {
					// restart node on jelastic
					await axios.get(process.env.RESTART_SERVER_URL);
				}
			}
		}
	}, 5 * 60 * 1000);
}

init();

process.on('uncaughtException', function (err) {
	console.log('keeping process alive:', err.message);
});
