import { IMargin, IPadding } from '../../../../types/layouts';
import { ESize } from '../../utils/enum';

interface IBMSkeleton extends IPadding, IMargin {
	width?: string | number | ESize;
	height?: string | number | ESize;
	circle?: boolean;
	className?: string;
}

interface ISkeleton {
	loading?: boolean;
	skWidth?: IBMSkeleton['width'];
	skHeight?: IBMSkeleton['height'];
	circle?: IBMSkeleton['circle'];
}

export type { IBMSkeleton, ISkeleton };
