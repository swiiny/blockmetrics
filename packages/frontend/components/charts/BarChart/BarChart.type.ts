import { EDailyData } from '../../../styles/theme/utils/enum';

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
}

export type { IChartContainer, IBarChart };
