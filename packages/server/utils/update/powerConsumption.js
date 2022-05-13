import { updatePowerConsumptionInBlockchain } from "../sql.js";

export async function updatePowerConsumptionInDb(con, chains) {
    try {
		if (!(chains.length >= 0)) {
			throw new Error('no chains to update');
		}

        const promises = chains.map(async (chain) => con.query(updatePowerConsumptionInBlockchain, [chain.powerConsumption, chain.id]))

		await Promise.all(promises);

		return 0;
	} catch (err) {
		console.error('updatePowerConsumption', chains, err);
		return 1;
	}
}