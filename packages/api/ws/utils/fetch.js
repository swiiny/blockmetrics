// get blockchains data in the database endpoint
// TODO : protect from sql injection
export const getBlockchains = async (pool, params) => {
	try {
		let { orderBy, pagination } = params;
		orderBy = orderBy || "";
		pagination = pagination || "";

		let queryPrefix = `SELECT * FROM blockchain`;

		if (params.sortByField) {
			queryPrefix += ` AND ${params.sortByField} IS NOT NULL`;
		}

		const res = await pool.query(queryPrefix + orderBy + pagination);

		return res;
	} catch (err) {
		console.error("getBlockchains", err);
		return [];
	}
};
