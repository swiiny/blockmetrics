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
	insertDailyTransactionCount,
	updateDifficultyInBlockchain,
	updateHashrateInBlockchain,
	updateNodeCountAndReliabilityInBlockchain,
	updateTokenCountInBlockchain
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
			const uuid = `${id}-${timestamp}`;

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
			const uuid = `${id}-${timestamp}`;

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
			const uuid = `${id}-${timestamp}`;

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
			const uuid = `${id}-${timestamp}`;

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
			const uuid = `${id}-${timestamp}`;

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
			const uuid = `${id}-${timestamp}`;

			return con.query(insertDailyAddressesCount, [uuid, id, count, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyNewAddresses', id, err);
		return 1;
	}
}

export async function updateDbDailyTransaction(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, count }) => {
			const uuid = `${id}-${timestamp}`;

			return con.query(insertDailyTransactionCount, [uuid, id, count, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyTransaction', id, err);
		return 1;
	}
}

export async function updateDbDailyNewContracts(con, id, data) {
	try {
		if (!data) {
			throw new Error('data is not defined for ' + id);
		}

		const promises = data.map(({ timestamp, count }) => {
			const uuid = `${id}-${timestamp}`;

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
			// remove one day to get the date of the previous day from date
			const timestamp = Math.floor(new Date(date).setDate(new Date(date).getDate() - 1) / 1000);

			const uuid = `${id}-${timestamp}`;

			return con.query(insertDailyNewTokens, [uuid, id, count, date]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyNewTokens', id, err);
		return 1;
	}
}

export const updateDbDailyTokenCount = async (con, id, count) => {
	try {
		if (!count) {
			throw new Error('count is not defined for ' + id);
		}

		// get first timestamp of today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const timestamp = today.getTime() / 1000;

		const uuid = `${id}-${timestamp}`;

		const promises = [
			con.query(insertDailyTokenCount, [uuid, id, count, timestamp]),
			con.query(updateTokenCountInBlockchain, [count, id])
		];

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyTokenCount', id, err);
		return 1;
	}
};

export const updateDbDailyNodeCountAndReliability = async (con, id, count, reliability) => {
	try {
		if (!count) {
			throw new Error('count is not defined for ' + id);
		}

		if (!reliability) {
			throw new Error('reliability is not defined for ' + id);
		}

		// get first timestamp OF today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const timestamp = today.getTime() / 1000;

		const uuid = `${id}-${timestamp}`;

		const promises = [
			con.query(insertDailyNodeCount, [uuid, id, count, timestamp]),
			con.query(updateNodeCountAndReliabilityInBlockchain, [count, reliability, id])
		];

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updateDbDailyNodeCountAndReliability', id, err);
		return 1;
	}
};
