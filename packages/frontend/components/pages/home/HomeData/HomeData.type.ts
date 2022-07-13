import { EChartType, EDailyData } from '../../../../styles/theme/utils/enum';
import { IBarLineChartData } from '../../../../types/charts';

interface IHomeCardData {
	title: string;
	value: number;
	unit?: string;
	dailyChange: number;
	dailyChangeUnit?: string;
	dailyChangeColorReversed?: boolean;
	iconSrc: string;
	chartTitle: string;
	chartType: EChartType;
	chartDataType: EDailyData;
}

export type { IHomeCardData };
