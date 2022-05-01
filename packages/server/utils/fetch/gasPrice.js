import axios from 'axios';

export async function getEthGasPrice() {
	try {
		const url = `${process.env.ETHERSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`;

		const res = await axios.get(url);

		return res.data.result.SafeGasPrice;
	} catch (err) {
		console.error('getEthGasPrice', err);
		return null;
	}
}

export async function getBscGasPrice() {
	try {
		const url = `${process.env.BSCSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${process.env.BSCSCAN_API_KEY}`;

		const res = await axios.get(url);

		const { SafeGasPrice, UsdPrice } = res.data.result;

		return SafeGasPrice;
	} catch (err) {
		console.error('getBscGasPrice', err);
		return null;
	}
}

export async function getPolygonGasPrice() {
	try {
		const url = `${process.env.POLYGONSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${process.env.POLYGONSCAN_API_KEY}`;

		const res = await axios.get(url);

		const { SafeGasPrice, UsdPrice } = res.data.result;

		return SafeGasPrice;
	} catch (err) {
		console.error('getPolygonGasPrice', err);
		return null;
	}
}

export async function getAvalancheGasPrice() {
	try {
		const url = `https://gavax.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata`;

		const res = await axios.get(url);

		const { standardgaspricegwei } = res.data.result;

		return standardgaspricegwei;
	} catch (err) {
		console.error('getPolygonGasPrice', err);
		return null;
	}
}
