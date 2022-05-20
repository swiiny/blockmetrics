// ==============================================================================================
// ======= SELECT ===============================================================================
// ==============================================================================================
// get last block parsed number by blockchain id
export const getLastBlockParsedFromBlockParsed = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;
// get datas to calculate PoS blockchains power consumption
export const getPowerConsumptionDataForPoS = `SELECT id, single_node_power_consumption, node_count, testnet_node_count FROM blockchain WHERE consensus = 'pos'`;
// fetch public_address from blockchain_has_account table with limit and is_contract is null
export const getPublicAddressFromAccountWhereContractIsNull = `SELECT * FROM blockchain_has_account WHERE is_contract IS NULL LIMIT ?`;

// ==============================================================================================
// ======= INSERT ===============================================================================
// ==============================================================================================
// insert or update an account
export const insertOrUpdateAccount = `INSERT INTO account (public_address, blockchain_id, first_action_at, last_action_at) VALUES (?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE last_action_at = FROM_UNIXTIME(?), action_count = action_count + 1`;
// insert new hashrate
export const insertHashrateInHashrateHistory = `INSERT INTO hashrate_history (id, hashrate, blockchain_id) VALUES (?, ?, ?)`;

// ==============================================================================================
// ======= UPDATE ===============================================================================
// ==============================================================================================
// update token count in blockchain table by blockchain id
export const updateTokenCountInBlockchain = `UPDATE blockchain SET token_count = ? WHERE id = ?`;
// update number of last block fetched by blockchain id
export const udpdateBlockCountInBlockParsed = `UPDATE block_parsed SET number = ? WHERE blockchain_id = ?`;
// increment transactions count by blockchain id
export const increaseTxCountInBlockchain = `UPDATE blockchain SET transaction_count = transaction_count + ? WHERE id = ?`;
// update transaction count by blockchain id
export const updateTxCountInBlockchain = `UPDATE blockchain SET transaction_count = ? WHERE id = ?`;
// update hashrate by blockchain id
export const updateHashrateInBlockchain = `UPDATE blockchain SET hashrate = ? WHERE id = ?`;
// update difficulty by blockchain id
export const updateDifficultyInBlockchain = `UPDATE blockchain SET difficulty = ? WHERE id = ?`;
// update time between two blocks (from the new one to the last one)
export const updateTimeBetweenBlocksInBlockchain = `UPDATE blockchain SET time_between_blocks = ? WHERE id = ?`;
// udpate power consumption by blockchain id
export const updatePowerConsumptionInBlockchain = `UPDATE blockchain SET power_consumption = ? WHERE id = ?`;
// update is_contract by blockchain id and account public address in blochchain_has_account table
export const updateIsContractInBlockchainHasAccount = `UPDATE blockchain_has_account SET is_contract = ? WHERE blockchain_id = ? AND account_public_address = ?`;
