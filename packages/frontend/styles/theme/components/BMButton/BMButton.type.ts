import { ISkeleton } from '../../../../types/global';
import { ESize } from '../../utils/enum';

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
