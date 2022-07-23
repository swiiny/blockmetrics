// fetch chart data for a blockchain
export const EDailyData = {
	activeUsers: 'activeUsers',
	averageBlocktime: 'averageBlocktime',
	averageGasPrice: 'averageGasPrice',
	difficulty: 'difficulty',
	hashrate: 'hashrate',
	newAddress: 'newAddress',
	newContract: 'newContract',
	newTokens: 'newTokens',
	tokenCount: 'tokenCount',
	nodeCount: 'nodeCount',
	powerConsumption: 'powerConsumption',
	transactionCount: 'transactionCount',
	totalValueLocked: 'totalValueLocked'
};

// fetch chart data for all blockchains
export const EDailyGlobalData = {
	activeUsers: 'activeUsers',
	transactionsCount: 'transactionsCount',
	powerConsumption: 'powerConsumption',
	totalValueLocked: 'totalValueLocked'
};

// sum of data fetched for all blockchains
export const EGlobalData = {
	powerConsumption: 'powerConsumption',
	tokenCount: 'tokenCount',
	nodeCount: 'nodeCount',
	transactionCount: 'transactionCount',
	todayTransactionsCount: 'todayTransactionCount',
	addressCount: 'addressCount',
	todayAddressCount: 'todayAddressCount'
};
