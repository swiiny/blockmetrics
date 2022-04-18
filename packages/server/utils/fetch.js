import axios from "axios";

export const ETHERSCAN_API_URL = "https://api.etherscan.io/api";
export const BSCSCAN_API_URL = "https://api.bscscan.com/api";
export const POLYGONSCAN_API_URL = "https://api.etherscan.io/api";

const AVALANCHE_C_CHAIN_STATS_URL = "https://avascan.info/api/v1/home/statistics";

export async function getEthNodeCount() {
	try {
		const url = `${ETHERSCAN_API_URL}?module=stats&action=nodecount&apikey=${process.env.ETHERSCAN_API_KEY}`;

		const res = await axios.get(url);

		return res.data.result.TotalNodeCount;
	} catch (err) {
		console.error("getEthNodeCount", err);
		return null;
	}
}

export async function getBscNodeCount() {
	try {
		const url = `${BSCSCAN_API_URL}?module=stats&action=validators&apikey=${process.env.BSCSCAN_API_URL}`;

		const res = await axios.get(url);

		console.log("getBscNodeCount", res.data.result);

		return res.data.result.length;
	} catch (err) {
		console.error("getBscNodeCount", err);
		return null;
	}
}

export async function getPolygonNodeCount() {
	try {
		// const url = `${ETHERSCAN_API_URL}?module=stats&action=nodecount&apikey=${process.env.ETHERSCAN_API_KEY}`;

		// const res = await axios.get(url);

		return 25;
	} catch (err) {
		console.error("getEthNodeCount", err);
		return null;
	}
}

export async function getAvalancheStats() {
	try {
		const res = await axios.get(AVALANCHE_C_CHAIN_STATS_URL);

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
		console.error("getAvalancheStats", err);
		return null;
	}
}
