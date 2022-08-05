import { ESize } from '../../utils/enum';
import { ISkeleton } from '../BMSkeleton/BMSkeleton.type';

interface IBMButton extends ISkeleton {
	children: string | React.ReactNode;
	onClick?: () => void;
	secondary?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	id?: string;
	ariaLabel?: string;
	size?: ESize.s | ESize.m | ESize.l;
}

export type { IBMButton };
