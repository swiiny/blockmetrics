import { ESize } from '../../../../styles/theme/utils/enum';

interface ITitleAndValue {
	title: string;
	titleSize?: ESize;
	value: number;
	customDuration?: number;
	unit?: string;
}

export type { ITitleAndValue };
