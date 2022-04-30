import axios from "axios";

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
		console.error("getAvalancheStats", err);
		return null;
	}
}