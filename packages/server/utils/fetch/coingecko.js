import axios from 'axios';

import { CHAINS } from '../../variables.js';

async function getCGTokenList() {
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
}

function getTokensByNetworks(tokenList) {
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
}

export async function getTokensCountForNetworks() {
	try {
		const tokenList = await getCGTokenList();
		const tokensByNetworks = getTokensByNetworks(tokenList);

		const networks = Object.keys(tokensByNetworks);
		const tokensCount = [];

		const chainsValues = Object.values(CHAINS);

		const availableValues = chainsValues.map((chain) => chain.coingeckoId);

		networks.forEach((n) => {
			// test if network is listed on blockmetrics
			if (availableValues.includes(n)) {
				const chain = chainsValues.find((chain) => chain.coingeckoId === n);
				tokensCount.push({ id: chain.id, count: tokensByNetworks[n].length });
			}
		});

		return tokensCount;
	} catch (err) {
		console.log('Failed to update tokens count for networks, try again in 1 minute:', err);
		return null;
	}
}
