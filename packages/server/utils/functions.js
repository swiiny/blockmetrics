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

export const getRankFromScore = (score) => {
	const notes = ['D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];

	if (score >= 90) {
		return notes[notes.length - 1];
	}

	if (score < 10) {
		return notes[0];
	}

	// format score
	const formattedScore = (score / 100) * notes.length;

	return notes[Math.floor(formattedScore)];
};
