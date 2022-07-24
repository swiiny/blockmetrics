import { EChartType, EDailyData, EDailyGlobalData } from '../../../styles/theme/utils/enum';
import { IPadding } from '../../../types/layouts';

interface IChartCard extends IPadding {
	label: string;
	legendHidden?: boolean;
	chartType: EChartType;
	dailyType: EDailyData | EDailyGlobalData;
	unit?: string;
	decimals?: number;
	chainId?: string;
}

export type { IChartCard };
