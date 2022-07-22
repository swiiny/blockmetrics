import React, { FC, useCallback, useEffect } from 'react';
import useWebsocket from '../../../../hooks/useWebsocket';
import Flex from '../../../../styles/layout/Flex';
import { EChartType, EDailyGlobalData, EFlex, EGlobalData, ESubscribeType } from '../../../../styles/theme/utils/enum';
import HomeCard from '../HomeCard';
import { StyledList } from './HomeData.styles';
import { IHomeCardData } from './HomeData.type';

const HOMECARD_DATA: IHomeCardData[] = [
	{
		title: 'Total Addresses Count',
		valueType: EGlobalData.addressCount,
		iconSrc: '/assets/images/icons/profile-tick.svg',
		chartTitle: 'Daily Active Addresses',
		chartType: EChartType.bar,
		chartDataType: EDailyGlobalData.activeUsers
	},
	{
		title: 'Total Transactions Count',
		valueType: EGlobalData.transactionCount,
		dailyCustomLabel: 'today',
		subscribeChannel: ESubscribeType.todayTransactionCount,
		dailyChangeType: EGlobalData.todayTransactionsCount,
		refreshTime: 3,
		iconSrc: '/assets/images/icons/arrow-swap-horizontal.svg',
		chartTitle: 'Daily Transactions count',
		chartType: EChartType.bar,
		chartDataType: EDailyGlobalData.transactionsCount
	},
	{
		title: 'Last 24h Power Consumption',
		valueType: EGlobalData.powerConsumption,
		// dailyChangeType: EGlobalData.powerConsumption,
		unit: 'W/h',
		// dailyChange: 0,
		dailyChangeColorReversed: true,
		iconSrc: '/assets/images/icons/flash.svg',
		// dailyChangeUnit: '%',
		chartTitle: 'Daily Power Consumption',
		chartType: EChartType.line,
		chartDataType: EDailyGlobalData.powerConsumption
	}
];

const HomeData: FC = () => {
	const { subscribeTo, message } = useWebsocket();

	useEffect(() => {
		HOMECARD_DATA.map((data) => {
			if (data?.subscribeChannel) {
				subscribeTo(data.subscribeChannel);
			}
		});
	}, [subscribeTo]);

	return (
		<section>
			<StyledList>
				{HOMECARD_DATA.map((card) => (
					<HomeCard key={card.title} wsMessage={message} {...card} />
				))}
			</StyledList>
		</section>
	);
};

export { HomeData };
