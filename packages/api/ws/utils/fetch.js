import { blockchainTotalToColumnName } from './variables.js';

// get blockchains data in the database endpoint
export const getBlockchains = async (con, params) => {
	try {
		const { desc, sortBy, limit, offset } = params;

		let query = `SELECT id, name, node_count, testnet_node_count, reliability, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count, total_value_locked FROM blockchain`;

		if (sortBy) {
			query += ` ORDER BY ${sortBy} ${desc ? 'DESC' : 'ASC'}`;
		}

		if (limit) {
			query += ` LIMIT ${limit} OFFSET ${offset || 0}`;
		}

		const res = await con.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchains', err);
		return [];
	}
};

export const getBlockchainCards = async (con, params) => {
	try {
		const { desc, sortBy, limit, offset } = params;

		let query = `
		SELECT b.id, b.name, b.reliability, b.token_count, b.gas_price, s.rank 
		FROM blockchain b 
		INNER JOIN blockchain_score s
		ON b.id = s.blockchain_id
		`;

		if (sortBy) {
			query += ` ORDER BY ${sortBy} ${desc ? 'DESC' : 'ASC'}`;
		}

		if (limit) {
			query += ` LIMIT ${limit} OFFSET ${offset || 0}`;
		}

		const res = await con.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchains', err);
		return [];
	}
};

export const getBlockchainsTotalForProperty = async (con, params) => {
	try {
		const { property } = params;

		if (!Object.values(blockchainTotalToColumnName).includes(property)) {
			throw new Error('Invalid property');
		}

		let query = `SELECT SUM(${property}) AS value FROM blockchain`;

		const res = await con.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchainsTotalForProperty', err);
		return [];
	}
};

export const getBlockchainById = async (con, params) => {
	try {
		const { id } = params;

		let query = `SELECT id, name, note, node_count, testnet_node_count, reliability, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count FROM blockchain WHERE id = '${id}'`;

		const res = await con.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchainById', err);
		return [];
	}
};
