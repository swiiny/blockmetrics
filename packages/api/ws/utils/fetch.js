// get blockchains data in the database endpoint
// TODO : protect from sql injection
export const getBlockchains = async (pool, params) => {
	try {
		const { desc, sortBy, limit, offset } = params;

		let query = `SELECT id, name, note, node_count, testnet_node_count, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count FROM blockchain`;

		if (sortBy) {
			query += ` ORDER BY ${sortBy} ${desc ? 'DESC' : 'ASC'}`;
		}

		if (limit) {
			query += ` LIMIT ${limit} OFFSET ${offset || 0}`;
		}

		const res = await pool.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchains', err);
		return [];
	}
};

export const getBlockchainById = async (pool, params) => {
	try {
		const { id } = params;

		let query = `SELECT name, note, node_count, testnet_node_count, single_node_power_consumption, blockchain_power_consumption, hashrate, difficulty, last_block_timestamp, token_count, transaction_count, gas_price, consensus, today_transaction_count, address_count, today_address_count FROM blockchain WHERE id = ${id}`;

		const res = await pool.query(query);

		return res;
	} catch (err) {
		console.error('getBlockchainById', err);
		return [];
	}
};
