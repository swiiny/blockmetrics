type TBlockchain = {
	id: string;
	name: string;
	note: string;
	node_count: number;
	testnet_node_count: number;
	single_node_power_consumption: number;
	blockchain_power_consumption: number;
	hashrate: number;
	difficulty: number;
	last_block_timestamp: number;
	token_count: number;
	transaction_count: number;
	gas_price: number;
	consensus: string;
	today_transaction_count: number;
	address_count: number;
	today_address_count: number;
};

type TBlockchainMetadata = {
	tagline: string;
	description: string;
};
