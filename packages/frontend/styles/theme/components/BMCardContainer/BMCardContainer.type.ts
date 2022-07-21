import { ReactNode } from 'react';
import { IPadding } from '../../../../types/padding';

interface IBMCardContainer extends IPadding {
	children: ReactNode;
	clickable?: boolean;
	isHighlighted?: boolean;
	secondary?: boolean;
	tertiary?: boolean;
	fullWidth?: boolean;
	fullHeight?: boolean;
	as?: string;
}

export type { IBMCardContainer };
