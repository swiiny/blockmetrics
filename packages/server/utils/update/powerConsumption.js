import { insertDailyPowerConsumption, updatePowerConsumptionInBlockchain } from '../sql.js';

export async function updatePowerConsumptionInDb(con, chains) {
	try {
		if (!(chains.length >= 0)) {
			throw new Error('no chains to update');
		}

		// get timestamp of yesterday at  midnight
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

		// get timestamp from yesterday
		const timestamp = Math.floor(new Date(yesterday).setHours(0, 0, 0, 0) / 1000);

		console.log('timestamp: ', timestamp);

		const promises = chains.map(async (chain) => {
			const uuid = `${chain.id}-${timestamp}-${chain.powerConsumption}`;
			con.query(updatePowerConsumptionInBlockchain, [chain.powerConsumption, chain.id]);
			con.query(insertDailyPowerConsumption, [uuid, chain.id, chain.powerConsumption, timestamp]);
		});

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updatePowerConsumption', chains, err);
		return 1;
	}
}
