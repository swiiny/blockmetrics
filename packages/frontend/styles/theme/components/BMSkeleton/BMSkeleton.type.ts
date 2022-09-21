import { IMargin, IPadding } from '../../../../types/global';
import { ESize } from '../../utils/enum';

interface IBMSkeleton extends IPadding, IMargin {
	width?: string | number | ESize;
	height?: string | number | ESize;
	circle?: boolean;
}

export type { IBMSkeleton };
