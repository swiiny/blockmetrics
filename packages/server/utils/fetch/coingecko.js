import axios from 'axios';
import { fetchingDataActivated } from '../../server.js';
import { updateTokenCountInBlockchain } from '../sql.js';

import { CHAINS } from '../../variables.js';

let updateTokenCountTimeout;

const getCGTokenList = async () => {
	try {
		const url = `https://api.coingecko.com/api/v3/coins/list?include_platform=true`;
		const res = await axios.get(url);

		if (!res.data) {
			throw new Error('received null data');
		}
		return res.data;
	} catch (err) {
		console.log('Failed to get Coingecko token list:', err);
		return null;
	}
};

const getTokensByNetworks = (tokenList) => {
	const n = {};

	if (!(tokenList instanceof Array)) {
		return tokenList;
	}
	tokenList.forEach((t) => {
		const { platforms } = t;

		const keys = platforms ? Object.keys(platforms) : [];

		keys.forEach((k) => {
			!n[k] && (n[k] = []);

			// prevent from duplicate contract address
			if (!n[k].find((s) => s.address === platforms[k])) {
				platforms[k] && platforms[k].length > 0 && n[k].push({ ...t, address: platforms[k] });
			}
		});
	});

	return n;
};

export const updateTokensCountForNetworks = async (pool) => {
	if (process.env.DEBUG_LOGS === 'activated') {
		console.log('> start updating updateTokensCountForNetworks');
	}

	try {
		const con = await pool.getConnection();

		const tokenList = await getCGTokenList();
		const tokensByNetworks = getTokensByNetworks(tokenList);

		const networks = Object.keys(tokensByNetworks);
		const tokensCount = {};

		const chainsValues = Object.values(CHAINS);

		const availableValues = chainsValues.map((chain) => chain.coingeckoId);

		networks.forEach((n) => {
			if (availableValues.includes(n)) {
				const id = chainsValues.find((chain) => chain.coingeckoId === n);
				tokensCount[id] = tokensByNetworks[n].length;
			}
		});

		const promises = Object.keys(tokensCount).map((key) =>
			con.query(updateTokenCountInBlockchain, [tokensCount[key], key])
		);

		await Promise.all(promises);

		con.release();

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('> updateTokensCountForNetworks success, next update in 1 hour');
		}

		// update tokens count each hour
		if (fetchingDataActivated) {
			updateTokenCountTimeout = setTimeout(() => {
				updateTokensCountForNetworks(pool);
			}, 60 * 60 * 1000);
		}
	} catch (err) {
		console.log('Failed to update tokens count for networks, try again in 1 minute:', err);

		if (fetchingDataActivated) {
			// try again in a minute
			updateTokenCountTimeout = setTimeout(() => {
				updateTokensCountForNetworks(pool);
			}, 60 * 1000);
		}
	}
};

export { updateTokenCountTimeout };
