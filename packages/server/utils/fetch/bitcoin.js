import axios from 'axios';
import { CHAINS } from '../../variables.js';
import {
	increaseTodayTxCountInBlockchain,
	insertNewTodayActiveAddress,
	updateDifficultyInBlockchain,
	updateHashrateInBlockchain,
	updateLastBlockTimestamp
} from '../sql.js';
import WebSocket from 'ws';

let ws;
let updatableCon = null;

const fetchLastBitcoinBlockData = async (con) => {
	const { id } = CHAINS.bitcoin;

	try {
		const url = 'https://api.blockchain.info/stats';

		const res = await axios.get(url);

		const {
			timestamp,
			market_price_usd,
			hash_rate,
			total_fees_btc,
			n_btc_mined,
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

		// timestamp not saved here beacause it is 2 blocks behind
		const promises = [
			con.query(updateHashrateInBlockchain, [hash_rate * 10 ** -9, id]),
			con.query(updateDifficultyInBlockchain, [difficulty, id])
		];

		await Promise.all(promises);

		if (process.env.DEBUG_LOGS === 'activated') {
			console.log('Bitcoin data updated');
			console.log('next update approximatively in ' + minutes_between_blocks + ' minutes');
		}
	} catch (err) {
		console.error('fetchLastBitcoinBlockData', err);
	}
};

export async function fetchBitcoinData(pool) {
	const { id, name } = CHAINS.bitcoin;

	if (!updatableCon) {
		try {
			updatableCon = await pool.getConnection();
		} catch (err) {
			console.error("fetchBitcoinData can't update connexion", err);
		}
	}

	try {
		ws = new WebSocket(`wss://ws.blockchain.info/inv`);

		ws.on('open', () => {
			console.log('server subscribed to bitcoin blocks and transactions');
			ws.send(
				JSON.stringify({
					op: 'unconfirmed_sub'
				})
			);

			ws.send(
				JSON.stringify({
					op: 'blocks_sub'
				})
			);
		});

		ws.onmessage = (e) => {
			const res = JSON.parse(e.data);

			try {
				if (res.op === 'block') {
					if (process.env.DEBUG_LOGS === 'activated') {
						console.log('New bitcoin block received', Date.now());
					}

					const newBlock = res.x;
					const newTransactionsCount = newBlock.nTx;
					const blockTimestamp = newBlock.time;

					if (newTransactionsCount) {
						updatableCon.query(increaseTodayTxCountInBlockchain, [newTransactionsCount, id]);
					}

					updatableCon.query(updateLastBlockTimestamp, [blockTimestamp, id]);

					fetchLastBitcoinBlockData(updatableCon);
				} else if (res.op === 'utx') {
					const senderAddresses = res.x.inputs
						.map((input) => input?.prev_out?.addr || null)
						.filter((address) => address);

					// get timestamp of this day at  midnight
					const day = new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;

					// save addresses in database
					senderAddresses.map((address) => updatableCon.query(insertNewTodayActiveAddress, [address, id, day]));
				}
			} catch (err) {
				console.error('fetchBitcoinData message', res.op, err);
			}
		};

		ws.onerror = () => {
			console.error('bitcoin socket error');

			restart(pool);
		};
	} catch (err) {
		restart(pool, err);
	}
}

function restart(pool, err) {
	console.error('fetchBitcoinBlocks', err);

	updatableCon?.destroy();
	setTimeout(() => {
		console.log('restart fetchBitcoinData after error');

		ws = null;
		updatableCon = null;

		fetchBitcoinData(pool);
	}, 1 * 60 * 1000);
}
