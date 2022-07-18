export const blockchainId = {
	ethereum: 'ethereum',
	bitcoin: 'bitcoin',
	bsc: 'binance-smart-chain',
	polygon: 'polygon',
	avalanche: 'avalanche',
	fantom: 'fantom'
};

// the value must be the the column name in the blockchain table in the database
export const blockchainTotal = {
	addressCount: 'addressCount',
	transactionCount: 'transactionCount',
	todayTransactionCount: 'todayTransactionCount',
	todayAddressCount: 'todayAddressCount'
};

export const blockchainTotalToColumnName = {
	transactionCount: 'transaction_count',
	addressCount: 'address_count',
	todayAddressCount: 'today_address_count',
	todayTransactionCount: 'today_transaction_count'
};

export const subscribeType = {
	blockchains: 'blockchains',
	usersCount: 'usersCount',
	...blockchainTotal,
	...blockchainId
};
