import { chains } from '../server.js';

/**
 * calculate power comsumption for PoS chains
 * @param {*} singleNodePowerConsumption
 * @param {*} nodeCount
 * @returns
 */
export function calculatePowerConsumptionPerDayForPosChain(singleNodePowerConsumption, nodeCount, testnetNodeCount = 0) {
	return Math.round(singleNodePowerConsumption * (nodeCount + testnetNodeCount) * 24);
}

export function calculatePowerConsumption(singleNodePowerConsumption, nodeCount, testnetNodeCount = 0) {
	return Math.round(singleNodePowerConsumption * (nodeCount + testnetNodeCount));
}

export const getRpcByChainId = (chainId) => {
	const key = Object.keys(chains).find((key) => chains[key].id === chainId);
	return chains[key]?.rpc;
};
