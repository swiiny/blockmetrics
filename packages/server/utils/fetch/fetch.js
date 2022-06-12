import axios from 'axios';
import CSVToJSON from 'csvtojson';
import { CHAINS } from '../../variables.js';
import { getDailyTokenCount } from '../sql.js';

export async function getAvalancheStats() {
	try {
		const res = await axios.get(process.env.AVALANCHE_C_CHAIN_STATS_URL);

		// TODO : keep only used data
		return {
			blockchains: res.data.blockchains,
			validators: res.data.validators,
			stakingRatio: res.data.stakingRatio,
			stakingRewards: res.data.stakingRewards,
			price: res.data.price,
			marketcapByCirculatingSupply: res.data.marketcapByCirculatingSupply,
			marketcapByTotalSupply: res.data.marketcapByTotalSupply,
			circulatingSupply: res.data.circulatingSupply,
			lastTransactions24h: res.data.lastTransactions24h,
			lastAvgTps24h: res.data.lastAvgTps24h,
			assetsAndTokens: res.data.assetsAndTokens,
			burnedSinceLaunch: res.data.burnedSinceLaunch
		};
	} catch (err) {
		console.error('getAvalancheStats', err);
		return null;
	}
	return null;
}

// { timestamp: number; count: number}[]
export async function fetchDailyUniqueAddressesFor(chain) {
	const { id, chartPrefix } = chain;
	try {
		if (id === CHAINS.bitcoin.id) {
			/*
			// per day => daily active users of bitcoin
			const url = `${chartPrefix}/n-unique-addresses?timespan=30days&sampled=true&metadata=false&cors=true&format=json`;

			const { data } = await axios.get(url);

			const formattedJson = data.values.map(({ x, y }) => ({ timestamp: x, count: y }));
			console.log('formattedJson', formattedJson);
			*/
		} else {
			const url = `${chartPrefix}/address?output=csv`;

			const { data } = await axios.get(url);

			// convert data to json
			const json = await CSVToJSON().fromString(data);

			const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

			// get only the last 30 days
			const last30Days = json.filter(({ UnixTimeStamp }) => {
				return parseInt(UnixTimeStamp, 10) > theertyOneDaysAgo;
			});

			const formattedJson = last30Days.map(({ UnixTimeStamp, Value }) => ({
				timestamp: parseInt(UnixTimeStamp, 10),
				count: parseInt(Value, 10)
			}));

			return formattedJson;
		}
	} catch (err) {
		console.error('fetchDailyUniqueAddressesFor', err);
		return null;
	}
	return null;
}

// { timestamp: number; count: number}[]
export async function fetchDailyTransactionFor(chain) {
	const { id, chartPrefix } = chain;

	let formattedJson;

	try {
		if (id === CHAINS.bitcoin.id) {
			// per day => daily active users of bitcoin
			const url = `${chartPrefix}/n-transactions?timespan=30days&sampled=true&metadata=false&cors=true&format=json`;

			const { data } = await axios.get(url);

			formattedJson = data.values.map(({ x, y }) => ({ timestamp: x, count: y }));
		} else {
			const url = `${chartPrefix}/tx?output=csv`;

			const { data } = await axios.get(url);

			// convert data to json
			const json = await CSVToJSON().fromString(data);

			const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

			// get only the last 30 days
			const last30Days = json.filter(({ UnixTimeStamp }) => {
				return parseInt(UnixTimeStamp, 10) > theertyOneDaysAgo;
			});

			formattedJson = last30Days.map(({ UnixTimeStamp, Value }) => ({
				timestamp: parseInt(UnixTimeStamp, 10),
				count: parseInt(Value, 10)
			}));
		}

		return formattedJson;
	} catch (err) {
		console.error('fetchDailyTransactionFor', err);
		return null;
	}
}

// { timestamp: number; second: number}[]
export async function fetchDailyAverageBlockTimeFor(chain) {
	const { id, chartPrefix } = chain;
	try {
		if (id === CHAINS.bitcoin.id) {
			/*
			// per day => daily active users of bitcoin
			const url = `${chartPrefix}/n-unique-addresses?timespan=30days&sampled=true&metadata=false&cors=true&format=json`;

			const { data } = await axios.get(url);

			const formattedJson = data.values.map(({ x, y }) => ({ timestamp: x, second: y }));
			console.log('formattedJson', formattedJson);
			*/
		} else {
			const url = `${chartPrefix}/blocktime?output=csv`;

			const { data } = await axios.get(url);

			// convert data to json
			const json = await CSVToJSON().fromString(data);

			const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

			// get only the last 30 days
			const last30Days = json.filter(({ UnixTimeStamp }) => {
				return parseInt(UnixTimeStamp, 10) > theertyOneDaysAgo;
			});

			const formattedJson = last30Days.map(({ UnixTimeStamp, Value }) => ({
				timestamp: parseInt(UnixTimeStamp, 10),
				second: parseFloat(Value)
			}));

			return formattedJson;
		}
	} catch (err) {
		console.error('fetchDailyAverageBlockTimeFor', err);
		return null;
	}
	return null;
}

// { timestamp: number; count: number}[]
export async function fetchDailyActiveUsersFor(chain) {
	const { id, chartPrefix } = chain;

	let formattedJson;

	try {
		if (id === CHAINS.bitcoin.id) {
			// per day => daily active users of bitcoin
			const url = `${chartPrefix}/n-unique-addresses?timespan=30days&sampled=true&metadata=false&cors=true&format=json`;

			const { data } = await axios.get(url);

			formattedJson = data.values.map(({ x, y }) => ({ timestamp: x, count: y }));
		} else if (id === CHAINS.avalanche.id) {
			console.log('TODO - get this from the Avalanche chain');
			formattedJson = null;
		} else if (id === CHAINS.fantom.id) {
			console.log('TODO - get this from the Fantom chain');
			formattedJson = null;
		} else {
			const url = `${chartPrefix}/active-address?output=csv`;

			const { data } = await axios.get(url);

			// convert data to json
			const json = await CSVToJSON().fromString(data);

			const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

			// get only the last 30 days
			const last30Days = json.filter((item) => Date.parse(item['Date(UTC)']) / 1000 > theertyOneDaysAgo);

			formattedJson = last30Days.map((item) => ({
				timestamp: Date.parse(item['Date(UTC)']) / 1000,
				count: parseInt(item['Unique Address Sent Count'], 10)
			}));
		}

		return formattedJson;
	} catch (err) {
		console.error('fetchDailyActiveUsersFor', err);
		return null;
	}
}

// { timestamp: number; wei: number}[]
export async function fetchDailyAverageGasPriceFor(chain) {
	const { id, chartPrefix } = chain;

	let formattedJson;

	try {
		if (id === CHAINS.bitcoin.id) {
			throw new Error("bitcoin doesn't have gas price");
		} else {
			const url = `${chartPrefix}/gasprice?output=csv`;

			const { data } = await axios.get(url);

			// convert data to json
			const json = await CSVToJSON().fromString(data);

			const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

			// get only the last 30 days
			const last30Days = json.filter(({ UnixTimeStamp }) => {
				return parseInt(UnixTimeStamp, 10) > theertyOneDaysAgo;
			});

			formattedJson = last30Days.map((item) => ({
				timestamp: parseInt(item.UnixTimeStamp, 10),
				wei: parseFloat(item['Value (Wei)'])
			}));
		}

		return formattedJson;
	} catch (err) {
		console.error('fetchDailyAverageGasPriceFor', err);
		return null;
	}
}

// { timestamp: number; difficulty: number}[]
export async function fetchDifficultyFor(chain) {
	const { id, chartPrefix } = chain;

	let formattedJson;

	try {
		if (id === CHAINS.bitcoin.id) {
			const url = `${chartPrefix}/difficulty?timespan=30days&sampled=true&metadata=false&cors=true&format=json`;

			const { data } = await axios.get(url);

			formattedJson = data.values.map(({ x, y }) => ({ timestamp: x, difficulty: y }));
		} else if (id === CHAINS.ethereum.id) {
			const url = `${chartPrefix}/difficulty?output=csv`;

			const { data } = await axios.get(url);

			// convert data to json
			const json = await CSVToJSON().fromString(data);

			const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

			// get only the last 30 days
			const last30Days = json.filter(({ UnixTimeStamp }) => {
				return parseInt(UnixTimeStamp, 10) > theertyOneDaysAgo;
			});

			formattedJson = last30Days.map(({ UnixTimeStamp, Value }) => ({
				timestamp: parseInt(UnixTimeStamp, 10),
				difficulty: parseFloat(Value)
			}));
		} else {
			throw new Error('difficulty is not available for POS chains');
		}

		return formattedJson;
	} catch (err) {
		console.error('fetchDifficultyFor', err);
		return null;
	}
}

// { timestamp: number; hashrateTHs: number}[]
export async function fetchHashrateFor(chain) {
	const { id, chartPrefix, consensus } = chain;

	let formattedJson;

	if (consensus !== 'POW') {
		return null;
	}

	try {
		if (id === CHAINS.bitcoin.id) {
			const url = `${chartPrefix}/hash-rate?timespan=30days&sampled=true&metadata=false&cors=true&format=json`;

			const { data } = await axios.get(url);

			formattedJson = data.values.map(({ x, y }) => ({ timestamp: x, hashrateTHs: y }));
		} else if (id === CHAINS.ethereum.id) {
			const url = `${chartPrefix}/hashrate?output=csv`;

			const { data } = await axios.get(url);

			// convert data to json
			const json = await CSVToJSON().fromString(data);

			const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

			// get only the last 30 days
			const last30Days = json.filter(({ UnixTimeStamp }) => {
				return parseInt(UnixTimeStamp, 10) > theertyOneDaysAgo;
			});

			formattedJson = last30Days.map(({ UnixTimeStamp, Value }) => ({
				timestamp: parseInt(UnixTimeStamp, 10),
				hashrateTHs: parseFloat(Value) * 10 ** -3
			}));
		} else {
			throw new Error('Hashrate is not available for POS chains');
		}

		return formattedJson;
	} catch (err) {
		console.error('fetchHashrateFor', err);
		return null;
	}
}

// { timestamp: number; count: number}[]
export async function fetchDailyVerifiedContractsFor(chain) {
	const { id, chartPrefix } = chain;

	let formattedJson;

	if (id === CHAINS.bitcoin.id) {
		return null;
	}

	try {
		const url = `${chartPrefix}/verified-contracts?output=csv`;

		const { data } = await axios.get(url);

		// convert data to json
		const json = await CSVToJSON().fromString(data);

		const theertyOneDaysAgo = Date.now() / 1000 - 60 * 60 * 24 * 40;

		// get only the last 30 days
		const last30Days = json.filter(({ UnixTimeStamp }) => {
			return parseInt(UnixTimeStamp, 10) > theertyOneDaysAgo;
		});

		formattedJson = last30Days.map(({ UnixTimeStamp, No }) => ({
			timestamp: parseInt(UnixTimeStamp, 10),
			count: parseInt(No[' of Verified Contracts'], 10)
		}));

		return formattedJson;
	} catch (err) {
		console.error('fetchDailyVerifiedContractsFor', err);
		return null;
	}
}

// { timestamp: number; count: number}[]
export async function fetchDailyTokenCountFor(chain, con) {
	const { id, chartPrefix } = chain;

	if (id === CHAINS.bitcoin.id) {
		return null;
	}

	try {
		// get rows for last 40 days
		const [tokenRows] = await con.query(getDailyTokenCount, [id, 40]);

		return tokenRows;
	} catch (err) {
		console.error('fetchDailyTokenCountFor', err);
		return null;
	}
}
