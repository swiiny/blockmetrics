import { EChartType, EDailyGlobalData, EGlobalData } from '../../../../styles/theme/utils/enum';

interface IHomeCardData {
	title: string;
	value?: number;
	valueType: EGlobalData;
	dailyChangeType: EGlobalData;
	dailyCustomLabel?: string;
	unit?: string;
	dailyChange?: number;
	dailyChangeUnit?: string;
	dailyChangeColorReversed?: boolean;
	iconSrc: string;
	chartTitle: string;
	chartType: EChartType;
	chartDataType: EDailyGlobalData;
}

export type { IHomeCardData };
