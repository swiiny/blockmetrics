import React, { FC, useCallback, useEffect } from 'react';
import useWebsocket from '../../../../hooks/useWebsocket';
import Flex from '../../../../styles/layout/Flex';
import {
	EChartType,
	EDailyGlobalData,
	EFlex,
	EGlobalData,
	EIcon,
	ESubscribeType
} from '../../../../styles/theme/utils/enum';
import HomeCard from '../HomeCard';
import { StyledList } from './HomeData.styles';
import { IHomeCardData } from './HomeData.type';

const HOMECARD_DATA: IHomeCardData[] = [
	{
		title: 'Total Addresses Count',
		valueType: EGlobalData.addressCount,
		subscribeChannel: ESubscribeType.todayUserCount,
		dailyChangeType: EGlobalData.todayUserCount,
		dailyCustomLabel: 'today unique users',
		refreshTime: 60,
		icon: EIcon.user,
		chartTitle: 'Daily Active Addresses',
		chartType: EChartType.bar,
		chartDataType: EDailyGlobalData.activeUsers,
		helpText: 'Total number of addresses used at least once on all listed blockchains.'
	},
	{
		title: 'Total Transactions Count',
		valueType: EGlobalData.transactionCount,
		dailyCustomLabel: 'today',
		subscribeChannel: ESubscribeType.todayTransactionCount,
		dailyChangeType: EGlobalData.todayTransactionsCount,
		refreshTime: 3,
		icon: EIcon.swap,
		chartTitle: 'Daily Transactions count',
		chartType: EChartType.bar,
		chartDataType: EDailyGlobalData.transactionsCount,
		helpText: 'Total number of transactions made on all listed blockchains.'
	},
	{
		title: 'Last 24h Power Consumption',
		valueType: EGlobalData.powerConsumption,
		// dailyChangeType: EGlobalData.powerConsumption,
		unit: 'W/h',
		// dailyChange: 0,
		dailyChangeColorReversed: true,
		icon: EIcon.energy,
		// dailyChangeUnit: '%',
		chartTitle: 'Daily Power Consumption',
		chartType: EChartType.line,
		chartDataType: EDailyGlobalData.powerConsumption,
		helpText: 'Total power consumption of all listed blockchains.'
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
