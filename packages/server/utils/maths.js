export function addReliabilityFromChains(chains) {
	// considering full reliable if a chain has at least 12k nodes
	const maxValue = 12000;

	// get max value of chains.count
	//const maxValue = Math.max(...chains.filter((chain) => typeof chain.count === 'number').map((chain) => chain.count));

	const calcLog = (value) => {
		if (typeof value !== 'number' || value < 0) {
			return 0;
		}

		if (value > maxValue) {
			return Math.log(maxValue) * Math.log(maxValue);
		}

		return Math.log(value) * Math.log(maxValue);
	};

	const logs = chains.map((chain) => calcLog(chain.count));

	// get max value of logs to define the reliability percentage
	const maxLogs = Math.max(...logs);

	chains.forEach((chain) => {
		let newReliability = Math.floor((calcLog(chain.count) / maxLogs) * 100);

		if (newReliability > 100) {
			newReliability = 100;
		} else if (newReliability < 0) {
			newReliability = 0;
		}

		console.log(`${chain.id} has ${chain.count} nodes and is ${newReliability}% reliable`);

		chain.reliability = newReliability || 0;
	});

	return chains;
}
