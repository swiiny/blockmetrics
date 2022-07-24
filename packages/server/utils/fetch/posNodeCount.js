import axios from 'axios';
import { CHAINS } from '../../variables.js';
import { getAvalancheStats } from './fetch.js';

export async function getEthNodeCount() {
	try {
		// const url = `${process.env.ETHERSCAN_API_URL}?module=stats&action=nodecount&apikey=${process.env.ETHERSCAN_API_KEY}`;
		// const res = await axios.get(url);
		// return parseInt(res.data.result.TotalNodeCount, 10);

		const { data } = await axios.get('https://ethernodes.org/history');

		// keep only first line of data
		const [firstLine] = data.split('\n');

		// remove all content before [[
		const [, rest] = firstLine.split('lineChartData = ');

		// convert string to array
		const arrayOfNodes = JSON.parse(rest);

		return arrayOfNodes[arrayOfNodes.length - 1][1];
	} catch (err) {
		console.error('getEthNodeCount', err);
		return null;
	}
}

export async function getBscNodeCount() {
	try {
		const url = `${process.env.BSCSCAN_API_URL}?module=stats&action=validators&apikey=${process.env.BSCSCAN_API_KEY}`;

		const res = await axios.get(url);

		return res.data.result.length;
	} catch (err) {
		console.error('getBscNodeCount', err);
		return null;
	}
}
export async function getFantomNodeCount() {
	try {
		const url = `https://ftmscan.com/datasourceHandler?q=getstakers&draw=4&columns%5B0%5D%5Bdata%5D=rank&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=address&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=index&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=downtime&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=stake&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=delegatedMe&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=totalStake&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=active&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=6&order%5B0%5D%5Bdir%5D=desc&start=25&length=25&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1652522121208`;

		const res = await axios.get(url);

		return res.data.recordsTotal;
	} catch (err) {
		console.error('getFantomNodeCount', err);
		return null;
	}
}

/*
export async function getPolygonNodeCount() {
	try {
		// const url = `${process.env.ETHERSCAN_API_URL}?module=stats&action=nodecount&apikey=${process.env.ETHERSCAN_API_KEY}`;

		// const res = await axios.get(url);

		return 100;
	} catch (err) {
		console.error('getPolygonNodeCount', err);
		return null;
	}
}
*/

export async function getAvalancheNodeCount() {
	try {
		const { validators } = (await getAvalancheStats()) || {};

		return validators;
	} catch (err) {
		console.error('getBscNodeCount', err);
		return null;
	}
}

export async function getBitcoinNodeCount() {
	try {
		const url = `https://bitnodes.io/api/v1/snapshots?page=1&limit=1`;

		const res = await axios.get(url);

		return res.data.results[0].total_nodes;
	} catch (err) {
		console.error('getBitcoinNodeCount', err);
		return null;
	}
}

export const getNodeCountForAllBlockchains = async () => {
	// polygon is set to 100 in database as it's fixed
	try {
		const promises = [
			getEthNodeCount()
				.then((res) => ({ id: CHAINS.ethereum.id, count: res }))
				.catch(() => null),
			getBscNodeCount()
				.then((res) => ({ id: CHAINS.bsc.id, count: res }))
				.catch(() => null),
			getAvalancheNodeCount()
				.then((res) => ({ id: CHAINS.avalanche.id, count: res }))
				.catch(() => null),
			getBitcoinNodeCount()
				.then((res) => ({ id: CHAINS.bitcoin.id, count: res }))
				.catch(() => null),
			getFantomNodeCount()
				.then((res) => ({ id: CHAINS.fantom.id, count: res }))
				.catch(() => null)
		];

		const resolvedPromises = await Promise.all(promises);

		// add polygon to calc reliability correctly
		return [...resolvedPromises, { id: CHAINS.polygon.id, count: 100 }];
	} catch {
		return null;
	}
};
