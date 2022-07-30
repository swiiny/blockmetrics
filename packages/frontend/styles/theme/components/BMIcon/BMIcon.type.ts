import { EIcon, ESize, ETextColor } from '../../utils/enum';

interface IBMIcon {
	backgroundVisible?: boolean;
	type?: EIcon;
	size?: ESize;
	backgroundRadius?: ESize;
	backgroundSize?: ESize;
	color?: ETextColor;
	id?: string;
}

export type { IBMIcon };
