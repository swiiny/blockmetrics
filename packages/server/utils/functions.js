import { CHAINS } from '../variables.js';

/**
 * calculate power comsumption for PoS chains
 * @param {*} singleNodePowerConsumption
 * @param {*} nodeCount
 * @returns
 */
export function calculatePowerConsumptionPerDayForPosChain(
	singleNodePowerConsumption,
	nodeCount,
	testnetNodeCount = 0
) {
	return Math.round(singleNodePowerConsumption * (nodeCount + testnetNodeCount) * 24);
}

export function calculatePowerConsumptionPoS(singleNodePowerConsumption, nodeCount, testnetNodeCount = 0) {
	return Math.round(singleNodePowerConsumption * (nodeCount + testnetNodeCount));
}

export function calculatePowerConsumptionPoW(singleTransactionPowerConsumption, yesterdayAddressCount) {
	// split by 24 to convert Wday to Whour
	return Math.round((singleTransactionPowerConsumption * yesterdayAddressCount) / 24);
}

export const getRpcByChainId = (chainId) => {
	try {
		const chain = Object.values(CHAINS).find((chain) => chain.id === chainId);
		return chain.rpc;
	} catch {
		return null;
	}
};

export const getChainById = (chainId) => {
	try {
		const chain = Object.values(CHAINS).find((chain) => chain.id === chainId);
		return chain;
	} catch {
		return null;
	}
};
