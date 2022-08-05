import { ESize } from '../../utils/enum';

interface IBMSkeleton {
	width?: string | number | ESize;
	height?: string | number | ESize;
	circle?: boolean;
}

interface ISkeleton {
	loading?: boolean;
	skWidth?: IBMSkeleton['width'];
	skHeight?: IBMSkeleton['height'];
	circle?: IBMSkeleton['circle'];
}

export type { IBMSkeleton, ISkeleton };
