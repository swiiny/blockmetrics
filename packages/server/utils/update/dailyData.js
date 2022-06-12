import crypto from 'crypto';
import { insertDailyActiveUsers } from '../sql.js';

/**
 * update daily data in the database for the given chain id
 * @param {*} con database connexion
 * @param {*} id blockchain id
 * @param {*} data array of timestap + value
 * @returns
 */
export async function updateDbDailyActiveUsers(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined');
		}

		const uuid = crypto.randomUUID();

		const promises = data.map(({ timestamp, count }) =>
			con.query(insertDailyActiveUsers, [uuid, id, count, timestamp])
		);

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyActiveUsers', id, err);
		return 1;
	}
}
