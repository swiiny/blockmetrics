export const blockchainId = {
	ethereum: 'ethereum',
	bitcoin: 'bitcoin',
	bsc: 'binance-smart-chain',
	polygon: 'polygon',
	avalanche: 'avalanche',
	fantom: 'fantom'
};

export const subscribeType = {
	blockchains: 'blockchains',
	usersCount: 'usersCount',
	totalTransactionCount: 'totalTransactionCount',
	...blockchainId
};
