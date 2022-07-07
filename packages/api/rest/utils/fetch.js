// get blockchains data in the database endpoint

import { EDailyData } from './variables.js';

// TODO : protect from sql injection
export const getBlockchains = async (pool, params) => {
	try {
		const { desc, sortBy, limit, offset } = params;

		let queryPrefix = `SELECT id, name, note, node_count, testnet_node_count, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count FROM blockchain`;

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
		let query = `SELECT id, name, note, node_count, testnet_node_count, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count FROM blockchain WHERE id = '${id}'`;

		const res = await pool.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchainById', err);
		return [];
	}
};

export const getMetadataById = async (pool, id, language) => {
	try {
		let query = `SELECT blockchain_id, description, tagline FROM blockchain_metadata WHERE blockchain_id = '${id}' AND language = '${language}'`;

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
			case EDailyData.transactionCount:
				tableLabel = 'daily_transaction_count_history';
				valueLabel = 'transaction_count';
				break;
			default:
				return [];
		}

		let query = `SELECT date, ${valueLabel} FROM ${tableLabel} WHERE blockchain_id = ? AND date >= DATE_SUB(NOW(), INTERVAL 31 DAY) ORDER BY date ASC`;

		const res = await pool.query(query, [id]);

		return res;
	} catch (err) {
		console.error('getChartByIdAndType', err);
		return [];
	}
};
