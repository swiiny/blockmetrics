import crypto from "crypto";

/*
 * update the new node count in the database for the given chain id
 * @param {object} con - the database connection
 * @param {number} id - the chain uuid
 * @param {number} count - the new node count
 */
export async function updateDbNodeCount(con, id, count) {
	try {
		if (!count) {
			throw new Error("Node count is not defined");
		}

		const uuid = crypto.randomUUID();

		await con.query(`INSERT INTO node_count_history (id, blockchain_id, node_count) VALUES (?,?,?)`, [
			uuid,
			id,
			count
		]);
		await con.query(`UPDATE blockchain SET node_count = ? WHERE id = ?`, [count, id]);

		return 0;
	} catch (err) {
		console.error("updateDbNodeCount", id, count, err);
		return 1;
	}
}
