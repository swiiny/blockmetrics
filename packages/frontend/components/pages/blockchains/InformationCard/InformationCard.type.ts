interface IInformationCard {
	chainId?: string;
	onGetTagline?: (tagline: string) => void;
}

interface IRankingDetails {
	label: string;
	value: number;
	rank: string;
	helpText?: string;
}

export type { IInformationCard, IRankingDetails };
