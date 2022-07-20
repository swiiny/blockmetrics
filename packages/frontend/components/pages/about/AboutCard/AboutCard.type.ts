import { ReactNode } from 'react';
import { EIcon } from '../../../../styles/theme/utils/enum';

interface IAboutCard {
	icon?: EIcon;
	label: string;
	link?: string;
	bottomContent?: ReactNode;
}

export type { IAboutCard };
