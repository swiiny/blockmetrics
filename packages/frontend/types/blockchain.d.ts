import { EIcon } from '../styles/theme/utils/enum';

type TBlockchain = {
	id: string;
	name?: string;
	rank?: string;
	node_count?: number;
	testnet_node_count?: number;
	reliability?: number;
	total_value_locked?: number;
	single_node_power_consumption?: number;
	blockchain_power_consumption?: number;
	hashrate?: number;
	difficulty?: number;
	last_block_timestamp?: number;
	token_count?: number;
	transaction_count?: number;
	gas_price?: number;
	consensus?: string;
	today_transaction_count?: number;
	address_count?: number;
	today_address_count?: number;
	isSelected?: boolean;
	loading?: boolean;
	icon?: EIcon;
};

type TBlockchainMetadata = {
	tagline: string;
	description: string;
	genesis_block: string;
	source: string;
	links: string | undefined;
	blockchain_id?: string;
};

type TBlockchainScore = {
	id: string;
	rank: string;
	score: number;
	reliability: number;
	token_count: number;
	power_consumption: number;
	total_value_locked: number;
	speed: number;
};

export type { TBlockchain, TBlockchainMetadata, TBlockchainScore };
