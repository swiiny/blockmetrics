import axios from "axios";

export const ETHERSCAN_API_URL = "https://api.etherscan.io/api";
export const BSCSCAN_API_URL = "https://api.bscscan.com/api";
export const POLYGONSCAN_API_URL = "https://api.polygonscan.com/api";

const AVALANCHE_C_CHAIN_STATS_URL = "https://avascan.info/api/v1/home/statistics";

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