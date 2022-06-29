// get blockchains data in the database endpoint
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
