import axios from "axios";
import { getAvalancheStats } from "./fetch.js";

export async function getEthNodeCount() {
	try {
		const url = `${process.env.ETHERSCAN_API_URL}?module=stats&action=nodecount&apikey=${process.env.ETHERSCAN_API_KEY}`;

		const res = await axios.get(url);

		return res.data.result.TotalNodeCount;
	} catch (err) {
		console.error("getEthNodeCount", err);
		return null;
	}
}

export async function getBscNodeCount() {
	try {
		const url = `${process.env.BSCSCAN_API_URL}?module=stats&action=validators&apikey=${process.env.BSCSCAN_API_KEY}`;

		const res = await axios.get(url);

		return res.data.result.length;
	} catch (err) {
		console.error("getBscNodeCount", err);
		return null;
	}
}

export async function getPolygonNodeCount() {
	try {
		// const url = `${process.env.ETHERSCAN_API_URL}?module=stats&action=nodecount&apikey=${process.env.ETHERSCAN_API_KEY}`;

		// const res = await axios.get(url);

		return 25;
	} catch (err) {
		console.error("getPolygonNodeCount", err);
		return null;
	}
}

export async function getAvalancheNodeCount() {
	try {
		const { validators } = await getAvalancheStats();

		return validators;
	} catch (err) {
		console.error("getBscNodeCount", err);
		return null;
	}
}

export async function getBitcoinNodeCount() {
	try {
		const url = `https://bitnodes.io/api/v1/snapshots?page=1&limit=1`;

		const res = await axios.get(url);

		return res.data.results[0].total_nodes;
	} catch (err) {
		console.error("getBitcoinNodeCount", err);
		return null;
	}
}
