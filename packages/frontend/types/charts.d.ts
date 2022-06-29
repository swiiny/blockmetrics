import { EChartType, EDailyData } from '../styles/theme/utils/enum';

interface IBarLineChart {
	chartType: EChartType;
	dailyType: EDailyData;
	chainId: TBlockchain['id'];
}

interface IBarLineChartData {
	horizontalData: number;
	verticalData: number;
}
