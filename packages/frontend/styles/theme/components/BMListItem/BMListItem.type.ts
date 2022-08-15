import { ReactNode } from 'react';
import { IPadding } from '../../../../types/global';

interface IBMListItem extends IPadding {
	children: ReactNode | string;
	dotHidden?: boolean;
}

export type { IBMListItem };
