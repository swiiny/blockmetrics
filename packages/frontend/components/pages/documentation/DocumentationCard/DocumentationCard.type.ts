import { EDocumentationId } from '../../../../styles/theme/utils/enum';

interface IDocumentationCard {
	title: string;
	id: EDocumentationId;
	maxHeight?: string;
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
	linkLabel?: string;
	isLink?: boolean;
}

export type { IDocumentationCard, IDocumentationCardItem, IDocumentationCardSubitem };
