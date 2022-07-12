import { EDirection, ESize } from '../../utils/enums';

interface IBMGradientSeparator {
	direction?: EDirection.vertical | EDirection.horizontal;
	margin?: ESize;
}

export type { IBMGradientSeparator };
