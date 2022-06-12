// ==============================================================================================
// ======= SELECT ===============================================================================
// ==============================================================================================
// get datas to calculate PoS blockchains power consumption
export const getPowerConsumptionDataForPoS = `SELECT id, single_node_power_consumption, node_count, testnet_node_count FROM blockchain WHERE consensus = 'pos'`;

// ==============================================================================================
// ======= INSERT ===============================================================================
// ==============================================================================================
// INSERT NEW DAILY DATAS
export const insertDailyActiveUsers = `INSERT INTO daily_active_users_history (id, blockchain_id, user_count, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyAverageBlockTime = `INSERT INTO daily_average_blocktime_history (id, blockchain_id, second, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyAverageGasPrice = `INSERT INTO daily_average_gas_price_history (id, blockchain_id, gas_price, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyDifficulty = `INSERT INTO daily_difficulty_history (id, blockchain_id, difficulty, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyHashrate = `INSERT INTO daily_hashrate_history (id, blockchain_id, hashrate, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyAddressesCount = `INSERT INTO daily_new_addresses_history (id, blockchain_id, address_count, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyContracts = `INSERT INTO daily_new_contracts_history (id, blockchain_id, contract_count, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyNewTokens = `INSERT INTO daily_new_tokens_history (id, blockchain_id, token_count, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;
export const insertDailyNodeCount = `INSERT INTO daily_node_count_history (id, blockchain_id, node_count, FROM_UNIXTIME(date)) VALUES (?, ?, ?, ?)`;

// ==============================================================================================
// ======= UPDATE ===============================================================================
// ==============================================================================================
// update token count in blockchain table by blockchain id
export const updateTokenCountInBlockchain = `UPDATE blockchain SET token_count = ? WHERE id = ?`;
// increment transactions count by blockchain id
export const increaseTxCountInBlockchain = `UPDATE blockchain SET transaction_count = transaction_count + ? WHERE id = ?`;
// update transaction count by blockchain id
export const updateTxCountInBlockchain = `UPDATE blockchain SET transaction_count = ? WHERE id = ?`;
// update hashrate by blockchain id
export const updateHashrateInBlockchain = `UPDATE blockchain SET hashrate = ? WHERE id = ?`;
// update difficulty by blockchain id
export const updateDifficultyInBlockchain = `UPDATE blockchain SET difficulty = ? WHERE id = ?`;
// update last block timestamp
export const updateLastBlockTimestamp = `UPDATE blockchain SET last_block_timestamp = ? WHERE id = ?`;
// udpate power consumption by blockchain id
export const updatePowerConsumptionInBlockchain = `UPDATE blockchain SET blockchain_power_consumption = ? WHERE id = ?`;
