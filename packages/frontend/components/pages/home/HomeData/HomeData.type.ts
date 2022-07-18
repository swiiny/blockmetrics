import { IMessage } from '../../../../hooks/useWebsocket/useWebsocket.type';
import { EChartType, EDailyGlobalData, EGlobalData, ESubscribeType } from '../../../../styles/theme/utils/enum';

interface IHomeCardData {
	title: string;
	value?: number;
	valueType: EGlobalData;
	dailyChangeType?: EGlobalData;
	dailyCustomLabel?: string;
	subscribeChannel?: ESubscribeType;
	refreshTime?: number;
	wsMessage?: IMessage;
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
