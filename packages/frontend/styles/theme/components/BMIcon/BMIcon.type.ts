import { EIcon, ESize, ETextColor } from '../../utils/enum';

interface IBMIcon {
	backgroundVisible?: boolean;
	type?: EIcon;
	size?: ESize.s | ESize.m | ESize.l | ESize.xl;
	color?: ETextColor;
}

export type { IBMIcon };
