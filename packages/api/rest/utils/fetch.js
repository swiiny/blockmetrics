// get blockchains data in the database endpoint

import { EDailyData, EDailyGlobalData, EGlobalData } from './variables.js';

// TODO : protect from sql injection
export const getBlockchains = async (pool, params) => {
	try {
		const { desc, sortBy, limit, offset } = params;

		let queryPrefix = `SELECT id, name, node_count, testnet_node_count, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count, total_value_locked FROM blockchain`;

		// don't take care of none value
		// queryPrefix += ` AND ${params.sortByField} IS NOT NULL`;

		if (sortBy) {
			queryPrefix += ` ORDER BY ${sortBy} ${desc ? 'DESC' : 'ASC'}`;
		}

		if (limit) {
			queryPrefix += ` LIMIT ${limit} OFFSET ${offset || 0}`;
		}

		const res = await pool.query(queryPrefix);

		return res;
	} catch (err) {
		console.error('getBlockchains', err);
		return [];
	}
};

export const getBlockchainById = async (pool, id) => {
	try {
		let query = `SELECT id, name, node_count, testnet_node_count, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count, total_value_locked FROM blockchain WHERE id = '${id}'`;

		const res = await pool.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchainById', err);
		return [];
	}
};

export const getMetadataById = async (pool, id, language) => {
	try {
		let query = `SELECT blockchain_id, description, tagline, genesis_block, source, links FROM blockchain_metadata WHERE blockchain_id = '${id}' AND language = '${language}'`;

		const res = await pool.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchainById', err);
		return [];
	}
};

export const getMetadataAndScoreById = async (pool, id, language) => {
	try {
		let query = `SELECT m.blockchain_id as id, m.description, m.tagline, m.genesis_block, m.source, m.links, s.score, s.rank, s.reliability, s.token_count, s.power_consumption, s.proof_of_trust, s.community
									FROM blockchain_metadata m
									INNER JOIN blockchain_score s
									ON m.blockchain_id = s.blockchain_id
									WHERE m.blockchain_id = '${id}' AND m.language = '${language}'`;

		const res = await pool.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchainById', err);
		return [];
	}
};

export const getChartByIdAndType = async (pool, id, type) => {
	try {
		let tableLabel = '';
		let valueLabel = '';

		switch (type) {
			case EDailyData.activeUsers:
				tableLabel = 'daily_active_users_history';
				valueLabel = 'active_user_count';
				break;
			case EDailyData.averageBlocktime:
				tableLabel = 'daily_average_blocktime_history';
				valueLabel = 'second';
				break;
			case EDailyData.averageGasPrice:
				tableLabel = 'daily_average_gas_price_history';
				valueLabel = 'gas_price';
				break;
			case EDailyData.difficulty:
				tableLabel = 'daily_difficulty_history';
				valueLabel = 'difficulty';
				break;
			case EDailyData.hashrate:
				tableLabel = 'daily_hashrate_history';
				valueLabel = 'hashrate';
				break;
			case EDailyData.newAddress:
				tableLabel = 'daily_new_addresses_history';
				valueLabel = 'address_count';
				break;
			case EDailyData.newContract:
				tableLabel = 'daily_new_contracts_history';
				valueLabel = 'contract_count';
				break;
			case EDailyData.newTokens:
				tableLabel = 'daily_new_tokens_history';
				valueLabel = 'token_count';
				break;
			case EDailyData.tokenCount:
				tableLabel = 'daily_token_count_history';
				valueLabel = 'token_count';
				break;
			case EDailyData.nodeCount:
				tableLabel = 'daily_node_count_history';
				valueLabel = 'node_count';
				break;
			case EDailyData.powerConsumption:
				tableLabel = 'daily_power_consumption_history';
				valueLabel = 'power_consumption';
				break;
			case EDailyData.transactionCount:
				tableLabel = 'daily_transaction_count_history';
				valueLabel = 'transaction_count';
				break;
			case EDailyData.totalValueLocked:
				tableLabel = 'daily_total_value_locked_history';
				valueLabel = 'total_value_locked';
				break;
			default:
				return [];
		}

		let query = `SELECT date, ${valueLabel} AS value FROM ${tableLabel} WHERE blockchain_id = ? AND date >= DATE_SUB(NOW(), INTERVAL 31 DAY) ORDER BY date ASC`;

		const res = await pool.query(query, [id]);

		// filter out value with the same date
		const result = res[0].reduce((acc, cur) => {
			if (acc.length === 0) {
				acc.push(cur);
			} else {
				const last = acc[acc.length - 1];
				if (last.date.getTime() !== cur.date.getTime()) {
					acc.push(cur);
				}
			}
			return acc;
		}, []);

		return result;
	} catch (err) {
		console.error('getChartByIdAndType', err);
		return [];
	}
};

export const getChartGlobalByType = async (pool, type) => {
	try {
		let data;

		switch (type) {
			case EDailyGlobalData.activeUsers:
				data = await pool.query(
					`SELECT date, active_user_count AS value FROM daily_active_users_history WHERE date >= DATE_SUB(NOW(), INTERVAL 31 DAY) ORDER BY date ASC`
				);
				break;
			case EDailyGlobalData.transactionsCount:
				data = await pool.query(
					`SELECT date, transaction_count AS value FROM daily_transaction_count_history WHERE date >= DATE_SUB(NOW(), INTERVAL 31 DAY) ORDER BY date ASC`
				);
				break;
			case EDailyGlobalData.powerConsumption:
				data = await pool.query(
					`SELECT date, power_consumption AS value FROM daily_power_consumption_history WHERE date >= DATE_SUB(NOW(), INTERVAL 31 DAY) ORDER BY date ASC`
				);
				break;
			case EDailyGlobalData.totalValueLocked:
				data = await pool.query(
					`SELECT date, total_value_locked AS value FROM daily_total_value_locked_history WHERE date >= DATE_SUB(NOW(), INTERVAL 31 DAY) ORDER BY date ASC`
				);
				break;
			default:
				break;
		}

		// sum all values with the same day and return an array of objects with the date and the sum
		const result = data[0].reduce((acc, cur) => {
			const date = cur.date;
			const value = cur.value;

			if (acc[date]) {
				acc[date] += value;
			} else {
				acc[date] = value;
			}

			return acc;
		}, {});

		return Object.keys(result).map((key) => ({ date: key, value: result[key] }));
	} catch (err) {
		console.error('getChartGlobalByType', err);
		return [];
	}
};

export const getGlobalDataByType = async (pool, type) => {
	let valueLabel = '';
	try {
		switch (type) {
			case EGlobalData.powerConsumption:
				valueLabel = 'blockchain_power_consumption';
				break;
			case EGlobalData.tokenCount:
				valueLabel = 'token_count';
				break;
			case EGlobalData.nodeCount:
				valueLabel = 'node_count';
				break;
			case EGlobalData.transactionCount:
				valueLabel = 'transaction_count';
				break;
			case EGlobalData.todayTransactionsCount:
				valueLabel = 'today_transaction_count';
				break;
			case EGlobalData.addressCount:
				valueLabel = 'address_count';
				break;
			case EGlobalData.todayAddressCount:
				valueLabel = 'today_address_count';
				break;
			case EGlobalData.todayUserCount:
				valueLabel = 'today_user_count';
				break;
			case EGlobalData.todayContractCount:
				valueLabel = 'today_contract_count';
				break;
			default:
				return [];
		}

		// sum of all rows with the same valueLabel from blockchain table
		const res = await pool.query(`SELECT SUM(${valueLabel}) AS value FROM blockchain`);

		return {
			value: res[0][0].value
		};
	} catch (err) {
		console.error('getGlobalDataByType', err);
		return null;
	}
};
