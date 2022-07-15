import { ESize } from '../../utils/enum';

interface IBMButton {
	children: string | React.ReactNode;
	onClick?: () => void;
	secondary?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	id?: string;
	ariaLabel?: string;
	size?: ESize.s | ESize.m | ESize.l;
}

export type { IBMButton };
