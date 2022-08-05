import { EIcon } from '../../../../styles/theme/utils/enum';
import { TBlockchain } from '../../../../types/blockchain';
import { IComparePageDefaultBlockchain } from '../ComparePage/ComparePage.type';

interface ICompareBlockchains {
	blockchains: TBlockchain[] | IComparePageDefaultBlockchain[];
}

interface ICompareData {
	label: string;
	icon: EIcon;
	value: number;
	unit?: string;
	colorAnimationOnUpdate?: boolean;
	reverseColor?: boolean;
	isAnimated?: boolean;
	loading?: boolean;
}

export type { ICompareBlockchains, ICompareData };
