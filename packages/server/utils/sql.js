// ==============================================================================================
// ======= SELECT ===============================================================================
// ==============================================================================================
// get datas to calculate PoS blockchains power consumption
export const getPowerConsumptionDataForPoS = `SELECT id, single_node_power_consumption, node_count, testnet_node_count FROM blockchain WHERE consensus = 'pos'`;
export const getDailyTokenCount = `SELECT token_count, date FROM daily_token_count_history WHERE blockchain_id = ? AND date BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) AND NOW() ORDER BY date ASC`;
// return the count of active address for the current day for the given blockchain
export const getTodayActiveAddressCount = `SELECT COUNT(*) AS count FROM today_active_address WHERE blockchain_id = ? AND day = CURDATE()`;
// return the count of active contract addresses for the current day for the given blockchain
export const getTodayActiveContractCount = `SELECT COUNT(*) AS count FROM today_active_address WHERE blockchain_id = ? AND is_contract = 1 AND day = CURDATE()`;
// return the count of active user addresses for the current day for the given blockchain
export const getTodayActiveUsersCount = `SELECT COUNT(*) AS count FROM today_active_address WHERE blockchain_id = ? AND is_contract = 0 AND day = CURDATE()`;
// fetch data used to calculate the score
export const getScoreCalculationData = `
SELECT b.id, b.token_count, b.reliability, b.blockchain_power_consumption, b.transaction_count, b.total_value_locked, b.genesis_block, CAST(AVG(t.transaction_count) AS DECIMAL(10,0)) AS average_transaction_count
FROM daily_transaction_count_history t
INNER JOIN blockchain b
ON t.blockchain_id = b.id
WHERE t.date BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() 
GROUP BY b.id
`;
// get sum for each blockchains of all unique active address by blockchain id from today_active_address table for yesterday
export const getActiveUsersCountForAllBlockchainsFromTodayActiveAddresses = `
SELECT blockchain_id as id, COUNT(*) AS count 
FROM today_active_address 
WHERE day = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND is_contract = 0
GROUP BY blockchain_id
`;

// get Today Active Address when is_contract is null
export const getTodayActiveAddressesWhenIsContractIsNull =
	'SELECT address, blockchain_id, is_contract FROM today_active_address WHERE is_contract IS NULL AND blockchain_id = ? LIMIT ?';

// ==============================================================================================
// ======= INSERT ===============================================================================
// ==============================================================================================
// INSERT NEW DAILY DATAS
export const insertDailyActiveUsers = `INSERT INTO daily_active_users_history (id, blockchain_id, active_user_count, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyPowerConsumption = `INSERT INTO daily_power_consumption_history (id, blockchain_id, power_consumption, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyTvlConsumption = `INSERT INTO daily_total_value_locked_history (id, blockchain_id, total_value_locked, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyAverageBlockTime = `INSERT INTO daily_average_blocktime_history (id, blockchain_id, second, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyAverageGasPrice = `INSERT INTO daily_average_gas_price_history (id, blockchain_id, gas_price, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyDifficulty = `INSERT INTO daily_difficulty_history (id, blockchain_id, difficulty, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyHashrate = `INSERT INTO daily_hashrate_history (id, blockchain_id, hashrate, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyAddressesCount = `INSERT INTO daily_new_addresses_history (id, blockchain_id, address_count, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyTransactionCount = `INSERT INTO daily_transaction_count_history (id, blockchain_id, transaction_count, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyContracts = `INSERT INTO daily_new_contracts_history (id, blockchain_id, contract_count, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyNewTokens = `INSERT INTO daily_new_tokens_history (id, blockchain_id, token_count, date) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = id`;

export const insertDailyTokenCount = `INSERT INTO daily_token_count_history (id, blockchain_id, token_count, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyNodeCount = `INSERT INTO daily_node_count_history (id, blockchain_id, node_count, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;
export const insertDailyTxPowerConsumption = `INSERT INTO daily_transaction_power_consumption_history (id, blockchain_id, power_consumption, date) VALUES (?, ?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE id = id`;

export const insertNewTodayActiveAddress = `INSERT INTO today_active_address (address, blockchain_id, day) VALUES (?, ?, FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE address = address`;
export const insertNewTodayBitcoinActiveAddress = `INSERT INTO today_active_address (address, blockchain_id, day, is_contract) VALUES (?, ?, FROM_UNIXTIME(?), 0) ON DUPLICATE KEY UPDATE address = address`;

// ==============================================================================================
// ======= UPDATE ===============================================================================
// ==============================================================================================
// update score in blockchain
export const updateScoreInBlockchain = `UPDATE blockchain SET score = ? WHERE id = ?`;
// update token count in blockchain table by blockchain id
export const updateTokenCountInBlockchain = `UPDATE blockchain SET token_count = ? WHERE id = ?`;
// update total value blocked in blockchain table by blockchain id
export const updateTotalValueLockedInBlockchain = `UPDATE blockchain SET total_value_locked = ? WHERE id = ?`;
// update single transaction power consumption in blockchain table by blockchain id
export const updateTxPowerConsumptionInBlockchain = `UPDATE blockchain SET single_transaction_power_consumption = ? WHERE id = ?`;
// increment transactions count by blockchain id
export const increaseTodayTxCountInBlockchain = `UPDATE blockchain SET today_transaction_count = today_transaction_count + ? WHERE id = ?`;
// update transaction count by blockchain id
export const updateTxCountInBlockchain = `UPDATE blockchain SET transaction_count = ? WHERE id = ?`;
// update address count by blockchain id
export const updateAddressCountInBlockchain = `UPDATE blockchain SET address_count = ? WHERE id = ?`;
// update total address, total contract and total users count by blockchain id
export const updateTodayAddressUsersAndContractCountInBlockchain = `UPDATE blockchain SET today_address_count = ?, today_contract_count = ?, today_user_count = ? WHERE id = ?`;
// update address count by blockchain id
export const updateTodayAddressCountInBlockchain = `UPDATE blockchain SET today_address_count = ? WHERE id = ?`;
// update hashrate by blockchain id
export const updateHashrateInBlockchain = `UPDATE blockchain SET hashrate = ? WHERE id = ?`;
// update difficulty by blockchain id
export const updateDifficultyInBlockchain = `UPDATE blockchain SET difficulty = ? WHERE id = ?`;
// update node count in blockchain table by blockchain id
export const updateNodeCountAndReliabilityInBlockchain = `UPDATE blockchain SET node_count = ?, reliability = ? WHERE id = ?`;
// update last block timestamp
export const updateLastBlockTimestamp = `UPDATE blockchain SET last_block_timestamp = ? WHERE id = ?`;
// udpate power consumption by blockchain id
export const updatePowerConsumptionInBlockchain = `UPDATE blockchain SET blockchain_power_consumption = ? WHERE id = ?`;
// update blockchain data for each block
export const updateBlockchainWithNewBlockData = `UPDATE blockchain SET last_block_timestamp = ?, today_transaction_count = today_transaction_count + ?, gas_price = ? WHERE id = ?`;
export const updateBlockchainWithNewBlockDataWithoutGasPrice = `UPDATE blockchain SET last_block_timestamp = ?, today_transaction_count = today_transaction_count + ? WHERE id = ?`;
// update blockchain_score by blockchain id
export const updateBlockchainsRankingInBlockchainScore = `UPDATE blockchain_score SET \`rank\` = ?, score = ?, reliability = ?, token_count = ?, power_consumption = ?, total_value_locked = ?, proof_of_trust = ?, community = ? WHERE blockchain_id = ?`;

// update transaction count with value equal to 0
export const resetTodayTransactionCount = `UPDATE blockchain SET today_transaction_count = 0 WHERE id = ?`;
// update address count with value equal to 0
export const resetTodayAddressCount = `UPDATE blockchain SET today_address_count = 0 WHERE id = ?`;

export const updateTodayActiveAddressIsContract = `UPDATE today_active_address SET is_contract = ? WHERE blockchain_id = ? AND address = ?`;

// ==============================================================================================
// ======= DELETE ===============================================================================
// ==============================================================================================
// remove row with day older than today
export const removeYesterdayAddressFromTodayActiveAddress = `DELETE FROM today_active_address WHERE created_at < CURDATE()`;
