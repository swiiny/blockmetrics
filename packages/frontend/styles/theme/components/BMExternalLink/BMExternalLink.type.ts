import { ESize, ETextColor, ETextWeight } from '../../utils/enum';

interface IBMExternalLink {
	href: string;
	inheritStyles?: boolean;
	size?: ESize;
	weight?: ETextWeight;
	textColor?: ETextColor;
}

export type { IBMExternalLink };
