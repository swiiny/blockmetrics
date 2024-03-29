import { ReactNode } from 'react';
import { IMargin, IPadding } from '../../../../types/global';
import { IAnimation } from '../../../../types/styled';
import { ESize } from '../../utils/enum';

interface IBMCardContainer extends IPadding, IAnimation, IMargin {
	children: ReactNode;
	clickable?: boolean;
	isHighlighted?: boolean;
	secondary?: boolean;
	tertiary?: boolean;
	fullWidth?: boolean;
	fullHeight?: boolean;
	as?: string;
	id?: string;
	borderRadius?: ESize;
}

export type { IBMCardContainer };
