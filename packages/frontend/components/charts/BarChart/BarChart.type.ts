import { EDailyData } from '../../../styles/theme/utils/enum';
import { TBlockchain } from '../../../types/blockchain';

interface IBarChart {
	dailyType: EDailyData;
	chainId: TBlockchain['id'];
}

interface IChartContainer {
	containerHeight: string;
	containerMarginTop: string;
	chartHeight: string;
	chartHeightInt: number;
	chartVerticalDelta: string;
	heightFactor: number;
}

export type { IChartContainer, IBarChart };
