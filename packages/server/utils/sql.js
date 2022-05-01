// ==============================================================================================
// ======= SELECT ===============================================================================
// ==============================================================================================
// get last block parsed number by blockchain id
export const getLastBlockParsed = `SELECT number FROM block_parsed WHERE blockchain_id = ?`;

// ==============================================================================================
// ======= INSERT ===============================================================================
// ==============================================================================================
// insert or update an account
export const insertOrUpdateAccount = `INSERT INTO account (public_address, first_action_at, last_action_at) VALUES (?, FROM_UNIXTIME(?), FROM_UNIXTIME(?)) ON DUPLICATE KEY UPDATE last_action_at = FROM_UNIXTIME(?), action_count = action_count + 1`;
// insert if not exist an account in blockchain_has_account table
export const insertBlockchainHasAccount = `INSERT IGNORE INTO blockchain_has_account (blockchain_id, account_public_address) VALUES (?, ?)`;
// insert new hashrate
export const insertHashrate = `INSERT INTO hashrate_history (id, hashrate, blockchain_id) VALUES (?, ?, ?)`;

// ==============================================================================================
// ======= UPDATE ===============================================================================
// ==============================================================================================
// update token count in blockchain table by blockchain id
export const updateTokenCountInBlockain = `UPDATE blockchain SET token_count = ? WHERE id = ?`;
// update number of last block fetched by blockchain id
export const udpdateBlockCount = `UPDATE block_parsed SET number = ? WHERE blockchain_id = ?`;
// increment transactions count by blockchain id
export const increaseTxCount = `UPDATE blockchain SET transaction_count = transaction_count + ? WHERE id = ?`;
// update transaction count by blockchain id
export const updateTxCount = `UPDATE blockchain SET transaction_count = ? WHERE id = ?`;
// update hashrate by blockchain id
export const updateHashrate = `UPDATE blockchain SET hashrate = ? WHERE id = ?`;
// update time between two blocks (from the new one to the last one)
export const updateTimeBetweenBlocks = `UPDATE blockchain SET time_between_blocks = ? WHERE id = ?`;
