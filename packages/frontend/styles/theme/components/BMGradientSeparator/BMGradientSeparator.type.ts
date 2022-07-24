import { EDirection, ESize } from '../../utils/enum';

interface IBMGradientSeparator {
	direction?: EDirection.vertical | EDirection.horizontal;
	smMargin?: ESize;
	mdMargin?: ESize;
	lgMargin?: ESize;
	xlMargin?: ESize;
	margin?: ESize;
}

export type { IBMGradientSeparator };
