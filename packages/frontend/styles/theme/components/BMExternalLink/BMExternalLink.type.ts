import { ESize, ETextColor, ETextWeight } from '../../utils/enum';
import { ISkeleton } from '../BMSkeleton/BMSkeleton.type';

interface IBMExternalLink extends ISkeleton {
	href: string;
	inheritStyles?: boolean;
	size?: ESize;
	weight?: ETextWeight;
	textColor?: ETextColor;
}

export type { IBMExternalLink };
