import { EChartType, EDailyData } from '../styles/theme/utils/enum';

interface IBarLineChart {
	chartType?: EChartType;
	dailyType: EDailyData;
	chainId: TBlockchain['id'];
}

interface IBarLineChartData {
	x: string;
	y: number;
}

export type { IBarLineChart, IBarLineChartData };
