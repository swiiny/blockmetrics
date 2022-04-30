import axios from "axios";
import crypto from "crypto";
import { ethers } from "ethers";
import { chainId } from "../../server.js";

const udpdateBlockCount = `UPDATE block_parsed SET number = ? WHERE blockchain_id = ?`;
const increaseTxCount = `UPDATE blockchain SET transaction_count = transaction_count + ? WHERE id = ?`;
const updateTxCount = `UPDATE blockchain SET transaction_count = ? WHERE id = ?`;
const insertOrUpdateAccount = `INSERT INTO account (public_address, first_action_at, last_action_at) VALUES (?, FROM_UNIXTIME(?), FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE last_action_at = FROM_UNIXTIME(?), action_count = action_count + 1`;
const insertBlockchainHasAccount = `INSERT IGNORE INTO blockchain_has_account (blockchain_id, account_public_address) VALUES (?, ?)`;
const insertHashrate = `INSERT INTO hashrate_history (id, hashrate, blockchain_id) VALUES (?, ?, ?)`;
const updateHashrate = `UPDATE blockchain SET hashrate = ? WHERE id = ?`;
const updateTimeBetweenBlocks = `UPDATE blockchain SET time_between_blocks = ? WHERE id = ?`;

const logsActivated = true
                
export async function fetchEthBlocks(con) {
    const id = chainId.ethereum;
    const blockchainName = "Ethereum Mainnet";

    try {    
        const sql = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;
		const res = await con.query(sql, [id]);

		if (res.length !== 0) {
			const lastBlockCheck = res[0][0].number;

			const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMY_ETHEREUM_KEY);

			let block = await provider.getBlock(lastBlockCheck);
			let index = lastBlockCheck;
			
			while (block) {
				index++;
				block = await provider.getBlockWithTransactions(index);
				const transactions = block.transactions;
	
				const txPromises = transactions.map(({ from }) => provider.getCode(from).then(res => {
					if (res === "0x") {
						return {
							public_address: from,
							timestamp: block.timestamp,
						}
					} else {
						return null;
					}
				})).filter(res => res !== null);

				const resolvedTxPromises = await Promise.all(txPromises);

                logsActivated && console.log(blockchainName + " tx added to db: " + resolvedTxPromises.length);

				const promises = [
					con.query(udpdateBlockCount, [index, id]),
					con.query(increaseTxCount, [transactions.length, id]),
					...resolvedTxPromises.map(({ public_address, timestamp }) => (
						[
							con.query(insertOrUpdateAccount, [public_address, timestamp, timestamp, timestamp, id]),
							con.query(insertBlockchainHasAccount, [id, public_address])
						]
					)).flat(1),
				];

				await Promise.all(promises);
			}

            return blockchainName + " blocks fetched";
		} else {
            throw new Error("can't fetch block_parsed number for " + blockchainName);
        }
    } catch (err) {
        console.error("fetchEthBlocks", err);
        return blockchainName + " blocks error";
    }
}

export async function fetchPolygonBlocks(con) {
    const id = chainId.polygon;
    const blockchainName = "Polygon";

    try {    
        const sql = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;
		const res = await con.query(sql, [id]);

		if (res.length !== 0) {
			const lastBlockCheck = res[0][0].number;

			const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_POLYGON_KEY);

			let block = await provider.getBlock(lastBlockCheck);
			let index = lastBlockCheck;
			
			while (block) {
				index++;
				block = await provider.getBlockWithTransactions(index);
				const transactions = block.transactions;
	
				const txPromises = transactions.map(({ from }) => provider.getCode(from).then(res => {
					if (res === "0x") {
						return {
							public_address: from,
							timestamp: block.timestamp,
						}
					} else {
						return null;
					}
				})).filter(res => res !== null);

				const resolvedTxPromises = await Promise.all(txPromises);
               
                logsActivated && console.log(blockchainName + " tx added to db: " + resolvedTxPromises.length);
                
				const promises = [
					con.query(udpdateBlockCount, [index, id]),
					con.query(increaseTxCount, [transactions.length, id]),
					...resolvedTxPromises.map(({ public_address, timestamp }) => (
						[
							con.query(insertOrUpdateAccount, [public_address, timestamp, timestamp, timestamp, id]),
							con.query(insertBlockchainHasAccount, [id, public_address])
						]
					)).flat(1),
				];

				await Promise.all(promises);
			}

            return blockchainName + " blocks fetched";
		} else {
            throw new Error("can't fetch block_parsed number for " + blockchainName);
        }
    } catch (err) {
        console.error("fetchEthBlocks", err);
        return blockchainName + " blocks error";
    }
}

export async function fetchBitcoinData(con) {
    const id = chainId.bitcoin;
    const blockchainName = "Bitcoin";

    let updatableCon = con;

    if (!updatableCon) {
        try {
            const pool = await createDbPool();
            updatableCon = await pool.getConnection();
        } catch (err) {
            console.error("fetchBitcoinBlocks can't upate connexion", err);
        }
    }

    try {

        const url = 'https://api.blockchain.info/stats'

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
            trade_volume_usd,
        } = res.data

        const hashrateUuid = crypto.randomUUID();

        const promises = [
            updatableCon.query(udpdateBlockCount, [n_blocks_total, id]),
            updatableCon.query(updateTxCount, [n_tx, id]),
            updatableCon.query(insertHashrate, [hashrateUuid, hash_rate, id]),
            updatableCon.query(updateHashrate, [hash_rate, id]),
            updatableCon.query(updateTimeBetweenBlocks, [minutes_between_blocks * 60, id]),
        ]

        await Promise.all(promises);

        const timeBetweenNextUpdate = minutes_between_blocks + 0.5

        if (logsActivated) {
            console.log("Bitcoin data updated");
            console.log("next update in " + timeBetweenNextUpdate + " minutes");
        }

        setTimeout(() => {
            fetchBitcoinBlocks(updatableCon);
        }, timeBetweenNextUpdate * 60 * 1000);
    } catch (err) {
        console.error("fetchBitcoinBlocks", err);

        updatableCon?.release();

        setTimeout(() => {
            fetchBitcoinBlocks(null);
        }, 1 * 60 * 1000);
    }
}