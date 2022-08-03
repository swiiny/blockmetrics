import { EIcon } from '../../../../styles/theme/utils/enum';
import { TBlockchain } from '../../../../types/blockchain';

interface ICompareBlockchains {
	blockchains: TBlockchain[];
}

interface ICompareData {
	label: string;
	icon: EIcon;
	value: number;
	unit: string;
	colorAnimationOnUpdate?: boolean;
	reverseColor?: boolean;
	isAnimated?: boolean;
}

export type { ICompareBlockchains, ICompareData };
