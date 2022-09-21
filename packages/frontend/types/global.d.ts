import { IBMSkeleton } from '../styles/theme/components/BMSkeleton/BMSkeleton.type';
import { ESize } from '../styles/theme/utils/enum';

interface IPadding {
	padding?: ESize;
	paddingBottom?: ESize;
	paddingTop?: ESize;
	paddingLeft?: ESize;
	paddingRight?: ESize;
	paddingX?: ESize;
	paddingY?: ESize;

	smPadding?: ESize;
	smPaddingBottom?: ESize;
	smPaddingTop?: ESize;
	smPaddingLeft?: ESize;
	smPaddingRight?: ESize;
	smPaddingX?: ESize;
	smPaddingY?: ESize;

	mdPadding?: ESize;
	mdPaddingBottom?: ESize;
	mdPaddingTop?: ESize;
	mdPaddingLeft?: ESize;
	mdPaddingRight?: ESize;
	mdPaddingX?: ESize;
	mdPaddingY?: ESize;

	lgPadding?: ESize;
	lgPaddingBottom?: ESize;
	lgPaddingTop?: ESize;
	lgPaddingLeft?: ESize;
	lgPaddingRight?: ESize;
	lgPaddingX?: ESize;
	lgPaddingY?: ESize;

	xlPadding?: ESize;
	xlPaddingBottom?: ESize;
	xlPaddingTop?: ESize;
	xlPaddingLeft?: ESize;
	xlPaddingRight?: ESize;
	xlPaddingX?: ESize;
	xlPaddingY?: ESize;
}

interface IMargin {
	margin?: ESize;
	marginBottom?: ESize;
	marginTop?: ESize;
	marginLeft?: ESize;
	marginRight?: ESize;
	marginX?: ESize;
	marginY?: ESize;

	smMargin?: ESize;
	smMarginBottom?: ESize;
	smMarginTop?: ESize;
	smMarginLeft?: ESize;
	smMarginRight?: ESize;
	smMarginX?: ESize;
	smMarginY?: ESize;

	mdMargin?: ESize;
	mdMarginBottom?: ESize;
	mdMarginTop?: ESize;
	mdMarginLeft?: ESize;
	mdMarginRight?: ESize;
	mdMarginX?: ESize;
	mdMarginY?: ESize;

	lgMargin?: ESize;
	lgMarginBottom?: ESize;
	lgMarginTop?: ESize;
	lgMarginLeft?: ESize;
	lgMarginRight?: ESize;
	lgMarginX?: ESize;
	lgMarginY?: ESize;

	xlMargin?: ESize;
	xlMarginBottom?: ESize;
	xlMarginTop?: ESize;
	xlMarginLeft?: ESize;
	xlMarginRight?: ESize;
	xlMarginX?: ESize;
	xlMarginY?: ESize;
}

interface ISkeleton {
	loading?: boolean;
	loaderLineCount?: number;
	skWidth?: IBMSkeleton['width'];
	skHeight?: IBMSkeleton['height'];
	circle?: IBMSkeleton['circle'];
}

export type { IPadding, IMargin, ISkeleton };
