// @todo(fix reverse function by doing f-1 de f)
export function calculateScoreForChains(chains, property, maxValue, reverse = false) {
	let usedMaxValue = maxValue;

	if (!usedMaxValue) {
		// auto select as max the max value of the choosen property in the chains
		// get max value of chains.count
		usedMaxValue = Math.max(
			...chains.filter((chain) => typeof chain[property] !== 'undefined').map((chain) => chain[property])
		);
	}

	const calcLog = (value) => {
		if (typeof value !== 'number') {
			try {
				value = parseInt(value, 10);
			} catch {
				return 0;
			}
		}

		if (value < 0) {
			return 0;
		}

		if (value > usedMaxValue) {
			return Math.log(usedMaxValue) * Math.log(usedMaxValue);
		}

		return Math.log(value) * Math.log(usedMaxValue);
	};

	const logs = chains.map((chain) => calcLog(chain[property]));

	// get max value of logs to define the result score
	const maxLogs = Math.max(...logs);

	chains.forEach((chain) => {
		let newValue = Math.floor((calcLog(chain[property]) / maxLogs) * 100);

		if (newValue > 100) {
			newValue = 100;
		} else if (newValue < 0) {
			newValue = 0;
		}

		if (reverse) {
			newValue = 100 - newValue;
		}

		chain[property + '_res'] = newValue || 0;
	});

	return chains;
}

// get average of an array of numbers
export const getAverageOf = (items) => {
	try {
		return Math.floor((items.reduce((p, c) => p + c, 0) / items.length) * 100) / 100;
	} catch (err) {
		console.error('getAverageOf', err);
		return null;
	}
};
