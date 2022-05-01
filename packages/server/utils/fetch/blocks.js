import axios from 'axios';
import crypto from 'crypto';
import { ethers } from 'ethers';
import { chainId } from '../../server.js';
import { createDbPool } from '../pool/pool.js';

const udpdateBlockCount = `UPDATE block_parsed SET number = ? WHERE blockchain_id = ?`;
const increaseTxCount = `UPDATE blockchain SET transaction_count = transaction_count + ? WHERE id = ?`;
const updateTxCount = `UPDATE blockchain SET transaction_count = ? WHERE id = ?`;
const insertOrUpdateAccount = `INSERT INTO account (public_address, first_action_at, last_action_at) VALUES (?, FROM_UNIXTIME(?), FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE last_action_at = FROM_UNIXTIME(?), action_count = action_count + 1`;
const insertBlockchainHasAccount = `INSERT IGNORE INTO blockchain_has_account (blockchain_id, account_public_address) VALUES (?, ?)`;
const insertHashrate = `INSERT INTO hashrate_history (id, hashrate, blockchain_id) VALUES (?, ?, ?)`;
const updateHashrate = `UPDATE blockchain SET hashrate = ? WHERE id = ?`;
const updateTimeBetweenBlocks = `UPDATE blockchain SET time_between_blocks = ? WHERE id = ?`;

const logsActivated = false;

export async function fetchEthBlocks() {
	const id = chainId.ethereum;
	const blockchainName = 'Ethereum';

	let updatableCon = null;

	if (!updatableCon) {
		try {
			const pool = await createDbPool();
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchBitcoinBlocks can't update connexion", err);
		}
	}

	try {
		const sql = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;
		const res = await updatableCon.query(sql, [id]);

		if (res.length !== 0) {
			const lastBlockCheck = res[0][0].number;

			const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/' + process.env.ALCHEMY_ETHEREUM_KEY);

			let block = 'not null';
			let index = lastBlockCheck;
			let lastBlockTimestamp = 0;

			while (block) {
				let startTime = Date.now();
				index++;
				block = await provider.getBlockWithTransactions(index);
				const transactions = block.transactions;

				/*const txPromises = transactions
					.map(({ from }) =>
						provider.getCode(from).then((res) => {
							if (res === '0x') {
								return {
									public_address: from,
									timestamp: block.timestamp
								};
							} else {
								return null;
							}
						})
					)
					.filter((res) => res !== null);
                    */

				const txPromises = transactions.map(({ from }) => ({
					public_address: from,
					timestamp: block.timestamp
				}));

				const resolvedTxPromises = await Promise.all(txPromises);

				logsActivated && console.log(blockchainName + ' tx added to db: ' + resolvedTxPromises.length);

				// calculate time between this block and the last one
				const timeBetweenTwoBlocks = (block.timestamp - lastBlockTimestamp) / 1000;
				lastBlockTimestamp = block.timestamp;

				const promises = [
					updatableCon.query(udpdateBlockCount, [index, id]),
					updatableCon.query(increaseTxCount, [transactions.length, id]),
					...resolvedTxPromises
						.map(({ public_address, timestamp }) => [
							updatableCon.query(insertOrUpdateAccount, [public_address, timestamp, timestamp, timestamp, id]),
							updatableCon.query(insertBlockchainHasAccount, [id, public_address])
						])
						.flat(1),
					updatableCon.query(updateTimeBetweenBlocks, [timeBetweenTwoBlocks, id])
				];

				await Promise.all(promises);

				console.log(blockchainName + ' block n°' + index + ' fetched and saved in db in ' + (Date.now() - startTime) + 'ms');
			}

			console.log(blockchainName + ' blocks fetched and saved in db');
			updatableCon?.release();

			setTimeout(() => {
				console.log('> start fetching new blocks for ' + blockchainName);
				fetchEthBlocks(updatableCon);
			}, 1 * 60 * 1000);
		} else {
			throw new Error("can't fetch block_parsed number for " + blockchainName);
		}
	} catch (err) {
		console.error('fetchEthBlocks', err);

		updatableCon?.release();

		setTimeout(() => {
			fetchEthBlocks();
		}, 1 * 60 * 1000);
	}
}

export async function fetchPolygonBlocks() {
	const id = chainId.polygon;
	const blockchainName = 'Polygon';

	let updatableCon = null;

	if (!updatableCon) {
		try {
			const pool = await createDbPool();
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchBitcoinBlocks can't update connexion", err);
		}
	}

	try {
		const sql = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;
		const res = await updatableCon.query(sql, [id]);

		if (res.length !== 0) {
			const lastBlockCheck = res[0][0].number;

			const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.g.alchemy.com/v2/' + process.env.ALCHEMY_POLYGON_KEY);

			let block = await provider.getBlock(lastBlockCheck);
			let index = lastBlockCheck;
			let lastBlockTimestamp = 0;

			while (block) {
				let startTime = Date.now();

				index++;
				block = await provider.getBlockWithTransactions(index);
				const transactions = block.transactions;

				/*const txPromises = transactions
					.map(({ from }) =>
						provider.getCode(from).then((res) => {
							if (res === '0x') {
								return {
									public_address: from,
									timestamp: block.timestamp
								};
							} else {
								return null;
							}
						})
					)
					.filter((res) => res !== null);
                    */

				const txPromises = transactions.map(({ from }) => ({
					public_address: from,
					timestamp: block.timestamp
				}));

				const resolvedTxPromises = await Promise.all(txPromises);

				logsActivated && console.log(blockchainName + ' tx added to db: ' + resolvedTxPromises.length);

				// calculate time between this block and the last one
				const timeBetweenTwoBlocks = (block.timestamp - lastBlockTimestamp) / 1000;
				lastBlockTimestamp = block.timestamp;

				const promises = [
					updatableCon.query(udpdateBlockCount, [index, id]),
					updatableCon.query(increaseTxCount, [transactions.length, id]),
					...resolvedTxPromises
						.map(({ public_address, timestamp }) => [
							updatableCon.query(insertOrUpdateAccount, [public_address, timestamp, timestamp, timestamp, id]),
							updatableCon.query(insertBlockchainHasAccount, [id, public_address])
						])
						.flat(1),
					updatableCon.query(updateTimeBetweenBlocks, [timeBetweenTwoBlocks, id])
				];

				await Promise.all(promises);

				console.log(blockchainName + ' block n°' + index + ' fetched and saved in db in ' + (Date.now() - startTime) + 'ms');
			}

			console.log(blockchainName + ' blocks fetched');
			updatableCon?.release();

			setTimeout(() => {
				console.log('> start fetching new blocks for ' + blockchainName);
				fetchEthBlocks();
			}, 1 * 60 * 1000);
		} else {
			throw new Error("can't fetch block_parsed number for " + blockchainName);
		}
	} catch (err) {
		console.error('fetchPoylgon error', err);

		updatableCon?.release();

		setTimeout(() => {
			fetchPolygonBlocks();
		}, 1 * 60 * 1000);
	}
}

export async function fetchBSCBlocks() {
	const id = chainId.bsc;
	const blockchainName = 'Binance SC';

	let updatableCon = null;

	if (!updatableCon) {
		try {
			const pool = await createDbPool();
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchBitcoinBlocks can't update connexion", err);
		}
	}

	try {
		const sql = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;
		const res = await updatableCon.query(sql, [id]);

		if (res.length !== 0) {
			const lastBlockCheck = res[0][0].number;

			const provider = new ethers.providers.JsonRpcProvider('https://bscrpc.com');

			let block = await provider.getBlock(lastBlockCheck);
			let index = lastBlockCheck;

			let lastBlockTimestamp = 0;

			while (block) {
				let startTime = Date.now();

				index++;
				block = await provider.getBlockWithTransactions(index);
				const transactions = block.transactions;

				/*const txPromises = transactions
					.map(({ from }) =>
						provider.getCode(from).then((res) => {
							if (res === '0x') {
								return {
									public_address: from,
									timestamp: block.timestamp
								};
							} else {
								return null;
							}
						})
					)
					.filter((res) => res !== null);
                    */

				const txPromises = transactions.map(({ from }) => ({
					public_address: from,
					timestamp: block.timestamp
				}));

				const resolvedTxPromises = await Promise.all(txPromises);

				logsActivated && console.log(blockchainName + ' tx added to db: ' + resolvedTxPromises.length);

				// calculate time between this block and the last one
				const timeBetweenTwoBlocks = (block.timestamp - lastBlockTimestamp) / 1000 || 0;
				lastBlockTimestamp = block.timestamp;

				const promises = [
					updatableCon.query(udpdateBlockCount, [index, id]),
					updatableCon.query(increaseTxCount, [transactions.length, id]),
					...resolvedTxPromises
						.map(({ public_address, timestamp }) => [
							updatableCon.query(insertOrUpdateAccount, [public_address, timestamp, timestamp, timestamp, id]),
							updatableCon.query(insertBlockchainHasAccount, [id, public_address])
						])
						.flat(1),
					updatableCon.query(updateTimeBetweenBlocks, [timeBetweenTwoBlocks, id])
				];

				await Promise.all(promises);

				console.log(blockchainName + ' block n°' + index + ' fetched and saved in db in ' + (Date.now() - startTime) + 'ms');
			}

			console.log(blockchainName + ' blocks fetched');
			updatableCon?.release();

			setTimeout(() => {
				console.log('> start fetching new blocks for ' + blockchainName);
				fetchBSCBlocks();
			}, 1 * 60 * 1000);
		} else {
			throw new Error("can't fetch block_parsed number for " + blockchainName);
		}
	} catch (err) {
		console.error('fetchBscBlocks', err);

		updatableCon?.release();

		setTimeout(() => {
			fetchBSCBlocks();
		}, 1 * 60 * 1000);
	}
}

export async function fetchAvalancheBlocks() {
	const id = chainId.avalanche;
	const blockchainName = 'Avlanche';

	let updatableCon = null;

	if (!updatableCon) {
		try {
			const pool = await createDbPool();
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchAvalancheBlocks can't update connexion", err);
		}
	}

	try {
		const sql = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;
		const res = await updatableCon.query(sql, [id]);

		if (res.length !== 0) {
			const lastBlockCheck = res[0][0].number;

			const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/b74bed2fa0614bc73ae1f3e8/avalanche/mainnet');

			let block = await provider.getBlock(lastBlockCheck);
			let index = lastBlockCheck;

			let lastBlockTimestamp = 0;

			while (block) {
				let startTime = Date.now();

				index++;
				block = await provider.getBlockWithTransactions(index);
				const transactions = block.transactions;

				/*const txPromises = transactions
					.map(({ from }) =>
						provider.getCode(from).then((res) => {
							if (res === '0x') {
								return {
									public_address: from,
									timestamp: block.timestamp
								};
							} else {
								return null;
							}
						})
					)
					.filter((res) => res !== null);
                    */

				const txPromises = transactions.map(({ from }) => ({
					public_address: from,
					timestamp: block.timestamp
				}));

				const resolvedTxPromises = await Promise.all(txPromises);

				logsActivated && console.log(blockchainName + ' tx added to db: ' + resolvedTxPromises.length);

				// calculate time between this block and the last one
				const timeBetweenTwoBlocks = (block.timestamp - lastBlockTimestamp) / 1000 || 0;
				lastBlockTimestamp = block.timestamp;

				const promises = [
					updatableCon.query(udpdateBlockCount, [index, id]),
					updatableCon.query(increaseTxCount, [transactions.length, id]),
					...resolvedTxPromises
						.map(({ public_address, timestamp }) => [
							updatableCon.query(insertOrUpdateAccount, [public_address, timestamp, timestamp, timestamp, id]),
							updatableCon.query(insertBlockchainHasAccount, [id, public_address])
						])
						.flat(1),
					updatableCon.query(updateTimeBetweenBlocks, [timeBetweenTwoBlocks, id])
				];

				await Promise.all(promises);

				console.log(blockchainName + ' block n°' + index + ' fetched and saved in db in ' + (Date.now() - startTime) + 'ms');
			}

			console.log(blockchainName + ' blocks fetched');
			updatableCon?.release();

			setTimeout(() => {
				console.log('> start fetching new blocks for ' + blockchainName);
				fetchAvalancheBlocks(updatableCon);
			}, 1 * 60 * 1000);
		} else {
			throw new Error("can't fetch block_parsed number for " + blockchainName);
		}
	} catch (err) {
		console.error('fetchBscBlocks', err);

		updatableCon?.release();

		setTimeout(() => {
			fetchAvalancheBlocks();
		}, 1 * 60 * 1000);
	}
}

export async function fetchBitcoinData() {
	const id = chainId.bitcoin;
	const blockchainName = 'Bitcoin';

	let updatableCon = null;

	if (!updatableCon) {
		try {
			const pool = await createDbPool();
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchBitcoinBlocks can't update connexion", err);
		}
	}

	try {
		let startTime = Date.now();
		const url = 'https://api.blockchain.info/stats';

		const res = await axios.get(url);

		const {
			timestamp,
			market_price_usd,
			hash_rate,
			total_fees_btc,
			n_btc_mined,
			n_tx,
			n_blocks_mined,
			minutes_between_blocks,
			totalbc,
			n_blocks_total,
			estimated_transaction_volume_usd,
			blocks_size,
			miners_revenue_usd,
			nextretarget,
			difficulty,
			estimated_btc_sent,
			miners_revenue_btc,
			total_btc_sent,
			trade_volume_btc,
			trade_volume_usd
		} = res.data;

		const hashrateUuid = crypto.randomUUID();

		const promises = [
			updatableCon.query(udpdateBlockCount, [n_blocks_total, id]),
			updatableCon.query(updateTxCount, [n_tx, id]),
			updatableCon.query(insertHashrate, [hashrateUuid, hash_rate, id]),
			updatableCon.query(updateHashrate, [hash_rate, id]),
			updatableCon.query(updateTimeBetweenBlocks, [minutes_between_blocks * 60, id])
		];

		await Promise.all(promises);

		console.log(blockchainName + ' data fetched and saved in db in ' + (Date.now() - startTime) + 'ms');

		const timeBetweenNextUpdate = minutes_between_blocks + 0.5;

		if (logsActivated) {
			console.log('Bitcoin data updated');
			console.log('next update in ' + timeBetweenNextUpdate + ' minutes');
		}

		updatableCon?.release();

		setTimeout(() => {
			fetchBitcoinData();
		}, timeBetweenNextUpdate * 60 * 1000);
	} catch (err) {
		console.error('fetchBitcoinBlocks', err);

		updatableCon?.release();

		setTimeout(() => {
			fetchBitcoinData();
		}, 1 * 60 * 1000);
	}
}
