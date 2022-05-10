// get blockchains data in the database endpoint
// TODO : protect from sql injection
export const getBlockchains = async (dbcpool, params) => {
	try {
		let { orderBy, pagination } = params;
		orderBy = orderBy || "";
		pagination = pagination || "";

		// TODO : Set fields to fetch separated by coma
		let queryPrefix = "SELECT  set, fields, to, fetch, separated, by, coma FROM coinsData WHERE ibt = 0";

		if (params.sortByField) {
			queryPrefix += ` AND ${params.sortByField} IS NOT NULL`;
		}

		const res = await dbcpool.query(queryPrefix + orderBy + pagination);

		return buildUniqueTokensListData(res[0]);
	} catch (err) {
		console.error("getBlockchains", err);
		return null;
	}
};
