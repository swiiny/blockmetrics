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

interface ITooltipChart {
	canvas: { parentNode: { querySelector: (arg0: string) => any; appendChild: (arg0: HTMLDivElement) => void } };
}

export type { IChartContainer, IBarChart, ITooltipChart };
