import { ReactNode } from 'react';
import { IPadding } from '../../../../types/padding';

interface IBMCardContainer extends IPadding {
	children: ReactNode;
	clickable?: boolean;
	as?: string;
}

export type { IBMCardContainer };
