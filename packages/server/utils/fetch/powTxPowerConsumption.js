import axios from 'axios';
import { CHAINS } from '../../variables.js';

function convertToWatt(value, baseUnit) {
	let newValue = value;
	const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

	units.forEach((unit, i) => {
		if (baseUnit.includes(unit)) {
			newValue = value * 10 ** (3 * (i + 1));
		}
	});

	return newValue;
}

export async function getPowerConsumption(query) {
	try {
		const url = `https://digiconomist.net/${query}`;

		const { data } = await axios.get(url);

		// convert data string to html
		const html = data.replace(/\n/g, '');

		// regex to select all content between <div id="rpt_pricr" and <div style="clear:both;"
		const regex = /<div id="rpt_pricr"[\s\S]*/g;
		const matches = html.match(regex);

		// for each match keep only the content between the <b> and </b> tags
		const res = matches.map((match) => {
			// remove all chars before the text "Single Bitcoin Transaction Footprints" and keep what is after
			const regex2 = /Transaction Footprints[\s\S]*/g;
			const step1 = match.match(regex2);

			const regex3 = /Electrical Energy[\s\S]*/g;
			const step2 = step1[0].match(regex3);

			const regex = /<b>([\s\S]*?)<\/b>/g;
			const matches = step2[0].match(regex);
			return matches[0].replace(/<b>/g, '').replace(/<\/b>/g, '');
		});

		const datas = res[0].split(' ');

		console.log('data', convertToWatt(parseFloat(datas[0]), datas[1]));
		return convertToWatt(parseFloat(datas[0]), datas[1]);
	} catch (err) {
		console.error('getEthTxPowerConsumption', err);
		return null;
	}
}

export const getTxPowerConsumptionForPoWChains = async () => {
	try {
		const promises = [
			getPowerConsumption('ethereum-energy-consumption')
				.then((res) => ({ id: CHAINS.ethereum.id, watt: res }))
				.catch(() => null),
			getPowerConsumption('bitcoin-energy-consumption')
				.then((res) => ({ id: CHAINS.bitcoin.id, watt: res }))
				.catch(() => null)
		];

		const resolvedPromises = await Promise.all(promises);

		return resolvedPromises;
	} catch {
		return null;
	}
};
