export const blockchainId = {
	ethereum: 'ethereum',
	bitcoin: 'bitcoin',
	'binance-smart-chain': 'binance-smart-chain',
	polygon: 'polygon',
	avalanche: 'avalanche',
	fantom: 'fantom'
};

// the value must be the the column name in the blockchain table in the database
export const blockchainTotal = {
	addressCount: 'addressCount',
	transactionCount: 'transactionCount',
	todayTransactionCount: 'todayTransactionCount',
	todayAddressCount: 'todayAddressCount',
	todayUserCount: 'todayUserCount',
	todayContractCount: 'todayContractCount'
};

export const blockchainTotalToColumnName = {
	transactionCount: 'transaction_count',
	addressCount: 'address_count',
	todayAddressCount: 'today_address_count',
	todayUserCount: 'today_user_count',
	todayContractCount: 'today_contract_count',
	todayTransactionCount: 'today_transaction_count'
};

export const subscribeType = {
	blockchains: 'blockchains',
	blockchainCards: 'blockchainCards',
	...blockchainTotal,
	...blockchainId
};
