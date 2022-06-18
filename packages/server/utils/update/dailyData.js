import crypto from 'crypto';
import {
	insertDailyActiveUsers,
	insertDailyAddressesCount,
	insertDailyAverageBlockTime,
	insertDailyAverageGasPrice,
	insertDailyContracts,
	insertDailyDifficulty,
	insertDailyHashrate,
	insertDailyNewTokens,
	insertDailyNodeCount,
	insertDailyTokenCount,
	updateDifficultyInBlockchain,
	updateHashrateInBlockchain
} from '../sql.js';

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
			throw new Error('data is not defined for ' + id);
		}

		//const uuid = crypto.randomUUID()

		const promises = data.map(({ timestamp, count }) => {
			const uuid = `${id}-${timestamp}-${count}`;

			return con.query(insertDailyActiveUsers, [uuid, id, count, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyActiveUsers', id, err);
		return 1;
	}
}

export async function updateDbDailyAverageBlocktime(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, second }) => {
			const uuid = `${id}-${timestamp}-${second}`;

			return con.query(insertDailyAverageBlockTime, [uuid, id, second, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyAverageBlocktime', id, err);
		return 1;
	}
}

export async function updateDbDailyAverageGasPrice(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, wei }) => {
			const uuid = `${id}-${timestamp}-${wei}`;

			return con.query(insertDailyAverageGasPrice, [uuid, id, wei, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyAverageGasPrice', id, err);
		return 1;
	}
}

export async function updateDbDailyDifficulty(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, difficulty }) => {
			const uuid = `${id}-${timestamp}-${difficulty}`;

			return con.query(insertDailyDifficulty, [uuid, id, difficulty, timestamp]);
		});

		const lastDifficulty = data?.[data.length - 1].difficulty;

		if (lastDifficulty) {
			promises.push(con.query(updateDifficultyInBlockchain, [lastDifficulty, id]));
		}

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyDifficulty', id, err);
		return 1;
	}
}

export async function updateDbDailyHashrate(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, hashrateTHs }) => {
			const uuid = `${id}-${timestamp}-${hashrateTHs}`;

			return con.query(insertDailyHashrate, [uuid, id, hashrateTHs, timestamp]);
		});

		const lastHashrate = data?.[data.length - 1].hashrateTHs;

		if (lastHashrate) {
			promises.push(con.query(updateHashrateInBlockchain, [lastHashrate, id]));
		}

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyHashrate', id, err);
		return 1;
	}
}

export async function updateDbDailyNewAddresses(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, count }) => {
			const uuid = `${id}-${timestamp}-${count}`;

			return con.query(insertDailyAddressesCount, [uuid, id, count, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyNewAddresses', id, err);
		return 1;
	}
}

export async function updateDbDailyNewContracts(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, count }) => {
			const uuid = `${id}-${timestamp}-${count}`;

			return con.query(insertDailyContracts, [uuid, id, count, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyNewContracts', id, err);
		return 1;
	}
}

export async function updateDbDailyNewTokens(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ date, count }) => {
			// date to timestamp
			const timestamp = Math.round(new Date(date).getTime() / 1000);

			const uuid = `${id}-${timestamp}-${count}`;

			return con.query(insertDailyNewTokens, [uuid, id, count, date]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyNewTokens', id, err);
		return 1;
	}
}

export async function updateDbNodeCount(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, count }) => {
			const uuid = `${id}-${timestamp}-${count}`;

			return con.query(insertDailyNodeCount, [uuid, id, count, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbNodeCount', id, err);
		return 1;
	}
}

export const updateDbDailyTokenCount = async (con, id, count) => {
	try {
		if (!count) {
			throw new Error('count is not defined for ' + id);
		}

		// get first timestamp OF today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const timestamp = today.getTime() / 1000;

		const uuid = `${id}-${timestamp}-${count}`;

		await con.query(insertDailyTokenCount, [uuid, id, count, timestamp]);

		return 0;
	} catch (err) {
		console.error('updateDbDailyTokenCount', id, err);
		return 1;
	}
};

export const updateDbDailyNodeCount = async (con, id, count) => {
	try {
		if (!count) {
			throw new Error('count is not defined for ' + id);
		}

		// get first timestamp OF today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const timestamp = today.getTime() / 1000;

		const uuid = `${id}-${timestamp}-${count}`;

		await con.query(insertDailyNodeCount, [uuid, id, count, timestamp]);

		return 0;
	} catch (err) {
		console.error('updateDbDailyTokenCount', id, err);
		return 1;
	}
};
