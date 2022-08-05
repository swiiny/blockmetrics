import { ReactNode } from 'react';

interface ITooltipPosition {
	top: number;
	left: number;
}

interface IElementTooltip {
	children: ReactNode;
	content?: string;
	disabled?: boolean;
}

export type { ITooltipPosition, IElementTooltip };
