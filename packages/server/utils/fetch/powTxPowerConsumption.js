import axios from 'axios';
import { CHAINS } from '../../variables.js';

export async function getPowerConsumption(chainId) {
	try {
		// get date format YYYYMMDD for yesterday
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
		const date = yesterday.replaceAll('-', '');

		const url = `https://digiconomist.net/wp-json/mo/v1/${chainId}/stats/${date}`;

		const { data } = await axios.get(url);

		return Math.floor((data[0]['24hr_kWh'] * 1000) / 24);
	} catch (err) {
		console.error('getEthTxPowerConsumption', err);
		return null;
	}
}

export const getTxPowerConsumptionForPoWChains = async () => {
	try {
		const promises = [
			getPowerConsumption('ethereum')
				.then((res) => ({ id: CHAINS.ethereum.id, powerConsumption: res }))
				.catch(() => null),
			getPowerConsumption('bitcoin')
				.then((res) => ({ id: CHAINS.bitcoin.id, powerConsumption: res }))
				.catch(() => null)
		];

		const resolvedPromises = await Promise.all(promises);

		return resolvedPromises.filter((res) => res !== null);
	} catch {
		return null;
	}
};
