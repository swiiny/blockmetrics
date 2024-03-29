import { EIcon } from '../styles/theme/utils/enum';

type TBlockchain = {
	id: string;
	name?: string;
	rank?: string;
	score?: number;
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
	today_user_count?: number;
	today_contract_count?: number;
	address_count?: number;
	today_address_count?: number;
	isSelected?: boolean;
	loading?: boolean;
	icon?: EIcon;
	genesis_block?: string;
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
	proof_of_trust: number;
};

export type { TBlockchain, TBlockchainMetadata, TBlockchainScore };
