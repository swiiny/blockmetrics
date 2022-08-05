import { TBlockchain } from '../../../../types/blockchain';

interface ICompareSelector {
	blockchains: TBlockchain[];
	onSelectBlockchain: (id: string | null) => void;
	selectedBlockchainIds: string[];
	loading?: boolean;
}

export type { ICompareSelector };
