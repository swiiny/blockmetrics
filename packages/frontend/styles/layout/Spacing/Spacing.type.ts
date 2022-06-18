import { EDirection, ESize } from '../../theme/utils/enum';

interface ISpacing {
	size: ESize;
	smSize?: ESize;
	mdSize?: ESize;
	lgSize?: ESize;
	xlSize?: ESize;
	xsDirection?: EDirection;
	smDirection?: EDirection;
	mdDirection?: EDirection;
	lgDirection?: EDirection;
	xlDirection?: EDirection;
}

export type { ISpacing };
