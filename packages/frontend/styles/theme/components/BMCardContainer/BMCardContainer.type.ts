import { ReactNode } from 'react';
import { IPadding } from '../../../../types/layouts';
import { IAnimation } from '../../../../types/styled';

interface IBMCardContainer extends IPadding, IAnimation {
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
