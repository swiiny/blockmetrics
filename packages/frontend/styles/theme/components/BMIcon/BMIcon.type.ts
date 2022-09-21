import { ISkeleton } from '../../../../types/global';
import { EIcon, ESize } from '../../utils/enum';

interface IBMIcon extends ISkeleton {
	backgroundVisible?: boolean;
	type?: EIcon;
	size?: ESize;
	backgroundRadius?: ESize;
	backgroundSize?: ESize;
	isVisible?: boolean;
	id?: string;
}

export type { IBMIcon };
