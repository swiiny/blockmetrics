import { EDirection, ESize } from '../../utils/enum';

interface IBMGradientSeparator {
	direction?: EDirection.vertical | EDirection.horizontal;
	margin?: ESize;
}

export type { IBMGradientSeparator };
