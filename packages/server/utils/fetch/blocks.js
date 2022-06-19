import { ethers } from 'ethers';
import { insertNewTodayActiveAddress, updateBlockchainWithNewBlockData } from '../sql.js';

const savedAverageGasPrice = {};

export async function fetchEVMBlockFor(chain, provider, blockNumber, con) {
	const { id, name } = chain;

	try {
		const block = await provider.getBlockWithTransactions(blockNumber);
		const transactions = block?.transactions || [];

		const txPromises =
			transactions?.map(({ from, gasPrice }) => ({
				public_address: from,
				timestamp: block.timestamp,
				gasPrice: gasPrice
			})) || [];

		const resolvedTxPromises = (await Promise.all(txPromises)) || [];

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('fetching EVM block for', name, blockNumber, ' with ', resolvedTxPromises.length, ' transactions');
		}

		const averageGasPrice = resolvedTxPromises.reduce(
			(acc, { gasPrice }) => acc.add(gasPrice),
			ethers.BigNumber.from(0)
		);
		const averageGasPriceInWei = averageGasPrice.div(ethers.BigNumber.from(transactions.length || 1));

		if (averageGasPriceInWei?.toString() !== '0') {
			savedAverageGasPrice[id] = averageGasPriceInWei?.toString();
		}

		// get timestamp of this day at  midnight
		const day = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;

		const promises = [
			resolvedTxPromises.map((tx) => con.query(insertNewTodayActiveAddress, [tx.public_address, id, day])),
			con.query(updateBlockchainWithNewBlockData, [
				block?.timestamp || Math.floor(Date.now() / 1000),
				transactions?.length || 0,
				savedAverageGasPrice[id],
				id
			])
		];
		await Promise.all(promises);
	} catch (err) {
		console.error('fetch blocks n°' + blockNumber + ' on ' + name, err);
	}
}
