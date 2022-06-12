interface IHeader {
	title: string;
	subtitle: string;
	image?: string;
	refreshAction?: () => void;
}

export type { IHeader };
