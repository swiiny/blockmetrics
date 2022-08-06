interface IDocumentationCard {
	title: string;
	subtitle?: string;
	items: IDocumentationCardItem[];
}

interface IDocumentationCardItem {
	label: string;
	highlightedValue?: string;
	subitems?: IDocumentationCardSubitem[];
}

interface IDocumentationCardSubitem {
	value: string;
	isLink?: boolean;
}

export type { IDocumentationCard, IDocumentationCardItem, IDocumentationCardSubitem };
