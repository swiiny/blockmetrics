import { CSSProperties } from 'react';
import { IMargin, IPadding } from '../../../../types/global';
import { ESize, ETextAlign, ETextColor, ETextTransform, ETextType, ETextWeight } from '../../utils/enum';
import { ISkeleton } from '../../../../types/global';

interface IBMText extends IPadding, IMargin, ISkeleton {
	children: React.ReactNode | string;
	type?: ETextType;
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: ETextAlign;
	textTransform?: ETextTransform;
	href?: string;
	disabled?: boolean;
	underline?: boolean;
	isExternal?: boolean;
	weight?: ETextWeight;
	singleLine?: boolean;
	className?: string;
	inheritStyle?: boolean;
	decoration?: boolean;
	opacityReduced?: boolean;
	as?: any;
	id?: string;
	style?: CSSProperties | string;
}

export type { IBMText };
