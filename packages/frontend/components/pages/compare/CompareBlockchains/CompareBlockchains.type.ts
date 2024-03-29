import { EIcon } from '../../../../styles/theme/utils/enum';
import { TBlockchain } from '../../../../types/blockchain';

interface ICompareBlockchains {
	blockchains: TBlockchain[];
}

interface ICompareData {
	label: string;
	icon: EIcon;
	value: number;
	fullValue?: string;
	unit?: string;
	colorAnimationOnUpdate?: boolean;
	reverseColor?: boolean;
	isAnimated?: boolean;
	loading?: boolean;
}

export type { ICompareBlockchains, ICompareData };
