import crypto from "crypto";

/*
 * update the new gas price in the database for the given chain id
 * @param {object} con - the database connection
 * @param {number} id - the chain uuid
 * @param {number} gasPrice - the new gas price
 */
export async function updateDbGasPrice(con, id, gasPrice) {
	try {
		if (!gasPrice) {
			throw new Error("Gas price is not defined");
		}

		const uuid = crypto.randomUUID();

		await con.query(`INSERT INTO gas_price_history (id, blockchain_id, gas_price) VALUES (?,?,?)`, [
			uuid,
			id,
			gasPrice
		]);
		await con.query(`UPDATE blockchain SET gas_price = ? WHERE id = ?`, [gasPrice, id]);

		return 0;
	} catch (err) {
		console.error("updateDbGasPrice", id, gasPrice, err);
		return 1;
	}
}
