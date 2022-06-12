import React from 'react';
import { EFlex, ESize } from '../../theme/utils/enum';

interface IFlex {
	children: React.ReactNode | React.ReactNode[];
	fullWidth?: boolean;
	fullHeight?: boolean;
	wrapItems?: boolean;
	as?: any;
	padding?: ESize;
	paddingBottom?: ESize;
	paddingTop?: ESize;
	paddingLeft?: ESize;
	paddingRight?: ESize;
	paddingX?: ESize;
	paddingY?: ESize;

	direction?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	horizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	vertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;

	smDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	mdDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	lgDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	xlDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;

	smHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	mdHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	lgHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	xlHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;

	smVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	mdVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	lgVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	xlVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
}

export type { IFlex };
