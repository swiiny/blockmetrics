import { ESize } from '../../utils/enum';

interface IBMProgressBar {
	label?: string;
	helpText?: string;
	size?: ESize;
	value?: number;
	loading?: boolean;
	endValueVisible?: boolean;
	endValue?: string;
}

export type { IBMProgressBar };
