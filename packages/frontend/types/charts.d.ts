import { EChartType, EDailyData } from '../styles/theme/utils/enum';

interface IBarLineChart {
	chartType?: EChartType;
	dailyType: EDailyData;
	chainId?: TBlockchain['id'];
	deactivateLegend?: boolean;
	heightFactor?: number;
	chartHeight?: number;
}

interface IBarLineChartData {
	x: string;
	y: number;
}

export type { IBarLineChart, IBarLineChartData };
