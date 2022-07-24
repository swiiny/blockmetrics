import { EIcon } from '../../../styles/theme/utils/enum';

interface IDataCard {
	value: number;
	label: string;
	icon: EIcon;
	unit?: string;
	isAnimated?: boolean;
	colorAnimationOnUpdate?: boolean;
	reverseColor?: boolean;
	isTimer?: boolean;
	as?: string;
	index?: number;
}

export type { IDataCard };
