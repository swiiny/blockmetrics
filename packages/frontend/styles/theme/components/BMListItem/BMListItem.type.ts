import { ReactNode } from 'react';
import { IPadding } from '../../../../types/layouts';

interface IBMListItem extends IPadding {
	children: ReactNode | string;
	dotHidden?: boolean;
}

export type { IBMListItem };
