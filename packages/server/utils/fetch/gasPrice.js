import axios from "axios";
import { BSCSCAN_API_URL, ETHERSCAN_API_URL, POLYGONSCAN_API_URL } from "./fetch.js";

export async function getEthGasPrice() {
	try {
		const url = `${ETHERSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`;

		const res = await axios.get(url);

		return res.data.result.SafeGasPrice;
	} catch (err) {
		console.error("getEthGasPrice", err);
		return null;
	}
}

export async function getBscGasPrice() {
	try {
		const url = `${BSCSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${process.env.BSCSCAN_API_KEY}`;

		const res = await axios.get(url);

		const { SafeGasPrice, UsdPrice } = res.data.result;

		return SafeGasPrice;
	} catch (err) {
		console.error("getBscGasPrice", err);
		return null;
	}
}

export async function getPolygonGasPrice() {
	try {
		const url = `${POLYGONSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${process.env.POLYGONSCAN_API_KEY}`;

		const res = await axios.get(url);

		const { SafeGasPrice, UsdPrice } = res.data.result;

		return SafeGasPrice;
	} catch (err) {
		console.error("getPolygonGasPrice", err);
		return null;
	}
}
