import { EChartType, EDailyData, EDailyGlobalData, ETextColor } from '../styles/theme/utils/enum';
import { TBlockchain } from './blockchain';

interface IBarLineChart {
	chartType?: EChartType;
	dailyType: EDailyData | EDailyGlobalData;
	chainId?: TBlockchain['id'];
	unit?: string;
	decimals?: number;
	color?: ETextColor;
	dynamicColor?: boolean;
	reverseColor?: boolean;
	deactivateLegend?: boolean;
	heightFactor?: number;
	chartHeight?: number;
	noLoading?: boolean;
	noError?: boolean;
}

interface IBarLineChartData {
	x: string;
	y: number;
}

export type { IBarLineChart, IBarLineChartData };
