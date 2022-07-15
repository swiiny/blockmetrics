import { EChartType, EDailyGlobalData } from '../../../../styles/theme/utils/enum';

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
	chartDataType: EDailyGlobalData;
}

export type { IHomeCardData };
