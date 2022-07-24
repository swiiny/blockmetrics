import { EIcon, ESize, ETextColor } from '../../utils/enum';

interface IBMIcon {
	backgroundVisible?: boolean;
	type?: EIcon;
	size?: ESize.xs | ESize.s | ESize.m | ESize.l | ESize.xl;
	backgroundRadius?: ESize;
	backgroundSize?: ESize;
	color?: ETextColor;
}

export type { IBMIcon };
