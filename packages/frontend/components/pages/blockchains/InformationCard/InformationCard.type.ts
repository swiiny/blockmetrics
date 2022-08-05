interface IInformationCard {
	chainId?: string;
	onGetTagline?: (tagline: string) => void;
}

interface IRankingDetails {
	label: string;
	value: number;
	helpText?: string;
}

export type { IInformationCard, IRankingDetails };
