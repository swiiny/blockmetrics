import { ReactNode } from 'react';
import { IMargin, IPadding } from '../../../../types/layouts';
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
	borderRadius?: ESize;
}

export type { IBMCardContainer };
