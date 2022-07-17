import { insertDailyPowerConsumption, updatePowerConsumptionInBlockchain } from '../sql.js';

export async function updatePowerConsumptionInDb(con, chains) {
	try {
		if (!(chains.length >= 0)) {
			throw new Error('no chains to update');
		}

		const timestamp = Date.now() / 1000;

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
