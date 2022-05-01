import axios from 'axios';
import { chainId } from '../../server.js';
import { createDbPool } from '../pool/pool.js';
import { updateTokenCountInBlockain } from '../sql.js';

const getCGTokenList = async () => {
	try {
		//const url = `https://pro-api.coingecko.com/api/v3/coins/list?include_platform=true&x_cg_pro_api_key=${process.env.CG_API}`;
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

export const updateTokensCountForNetworks = async () => {
	console.log('> start updating updateTokensCountForNetworks');

	try {
		const pool = await createDbPool();
		const con = await pool.getConnection();

		const tokenList = await getCGTokenList();
		const tokensByNetworks = getTokensByNetworks(tokenList);

		const networks = Object.keys(tokensByNetworks);
		const tokensCount = {};

		const idCoingeckoVsBlockmetrics = {
			[chainId.ethereum]: 'ethereum',
			[chainId.bitcoin]: 'bitcoin',
			[chainId.polygon]: 'polygon-pos',
			[chainId.bsc]: 'binance-smart-chain',
			[chainId.avalanche]: 'avalanche'
		};

		const availableValues = Object.keys(idCoingeckoVsBlockmetrics).map((key) => idCoingeckoVsBlockmetrics[key]);

		networks.forEach((n) => {
			if (availableValues.includes(n)) {
				const key = Object.keys(idCoingeckoVsBlockmetrics).find((key) => idCoingeckoVsBlockmetrics[key] === n);
				tokensCount[key] = tokensByNetworks[n].length;
			}
		});

		const promises = Object.keys(tokensCount).map((key) => {
			return con.query(updateTokenCountInBlockain, [tokensCount[key], key]);
		});

		await Promise.all(promises);

		con.release();
		console.log('> updateTokensCountForNetworks success, next update in 1 hour');

		// update tokens count each hour
		setTimeout(updateTokensCountForNetworks, 60 * 60 * 1000);
	} catch (err) {
		console.log('Failed to update tokens count for networks, try again in 1 minute:', err);

		// try again in a minute
		setTimeout(updateTokensCountForNetworks, 60 * 1000);
	}
};
