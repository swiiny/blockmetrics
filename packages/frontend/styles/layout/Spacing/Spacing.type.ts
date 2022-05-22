import { EDirection, ESize } from '../../theme/utils/enum';

interface ISpacing {
	size: ESize;
	xs?: EDirection;
	sm?: EDirection;
	md?: EDirection;
	lg?: EDirection;
	xl?: EDirection;
	className?: string;
}

export type { ISpacing };
