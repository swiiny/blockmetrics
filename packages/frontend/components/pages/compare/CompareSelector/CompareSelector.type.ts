interface ICompareSelector {
	blockchains: TBlockchain[];
	onSelectBlockchain: (id: string | null) => void;
	selectedBlockchainIds: string[];
}

export type { ICompareSelector };
