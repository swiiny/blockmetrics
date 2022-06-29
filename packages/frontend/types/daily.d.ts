interface IDailyData {
	id: string;
	blockchain_id: string;
	date: Date;
}

interface IActiveUsersHistory extends IDailyData {
	active_user_count: number;
}

interface IAverageBlocktimeHistory extends IDailyData {
	second: number;
}

interface IAverageGasPriceHistory extends IDailyData {
	gas_price: number;
}

interface IDifficultyHistory extends IDailyData {
	difficulty: number;
}

interface IHashrateHistory extends IDailyData {
	hashrate: number;
}

interface INewAddressHistory extends IDailyData {
	address_count: number;
}

interface INewContractHistory extends IDailyData {
	contract_count: number;
}

interface INewTokensHistory extends IDailyData {
	token_count: number;
}

interface ITokenCountHistory extends IDailyData {
	token_count: number;
}

interface INodeCountHistory extends IDailyData {
	node_count: number;
}

interface ITransactionCountHistory extends IDailyData {
	transaction_count: number;
}
