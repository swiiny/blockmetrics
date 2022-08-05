import { EIcon, ESize } from '../../utils/enum';
import { ISkeleton } from '../BMSkeleton/BMSkeleton.type';

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
