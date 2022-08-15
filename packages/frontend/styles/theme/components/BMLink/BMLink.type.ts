import { ESize, ETextColor, ETextWeight } from '../../utils/enum';
import { ISkeleton } from '../../../../types/global';

interface IBMLink extends ISkeleton {
	href?: string;
	children?: string;
	ariaLabel?: string;
	inheritStyles?: boolean;
	isInternal?: boolean;
	size?: ESize;
	weight?: ETextWeight;
	textColor?: ETextColor;
}

export type { IBMLink };
