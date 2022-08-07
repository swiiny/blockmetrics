import { EIcon } from '../../styles/theme/utils/enum';

interface IHeader {
	title: string;
	titleSemiBold?: string;
	subtitle?: string;
	subtitleLoading?: boolean;
	icon?: EIcon;
}

export type { IHeader };
