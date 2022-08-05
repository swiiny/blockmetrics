import { TBlockchain } from '../../../../types/blockchain';
import { IComparePageDefaultBlockchain } from '../ComparePage/ComparePage.type';

interface ICompareSelector {
	blockchains: TBlockchain[] | IComparePageDefaultBlockchain[];
	onSelectBlockchain: (id: string | null) => void;
	selectedBlockchainIds: string[];
	loading?: boolean;
}

export type { ICompareSelector };
