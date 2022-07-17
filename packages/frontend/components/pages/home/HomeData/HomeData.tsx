import React, { FC, useCallback, useEffect } from 'react';
import Flex from '../../../../styles/layout/Flex';
import { EChartType, EDailyGlobalData, EFlex, EGlobalData } from '../../../../styles/theme/utils/enum';
import HomeCard from '../HomeCard';
import { IHomeCardData } from './HomeData.type';

const HOMECARD_DATA: IHomeCardData[] = [
	{
		title: 'Today Users Count',
		valueType: EGlobalData.todayAddressCount,
		dailyChangeType: EGlobalData.todayAddressCount,
		dailyChange: 0,
		iconSrc: '/assets/images/icons/profile-tick.svg',
		chartTitle: 'Daily Active Users',
		chartType: EChartType.bar,
		chartDataType: EDailyGlobalData.activeUsers
	},
	{
		title: 'Total Transactions Count',
		valueType: EGlobalData.transactionCount,
		dailyChangeType: EGlobalData.todayTransactionsCount,
		dailyChange: 0,
		dailyCustomLabel: 'today',
		iconSrc: '/assets/images/icons/arrow-swap-horizontal.svg',
		chartTitle: 'Daily Transactions count',
		chartType: EChartType.line,
		chartDataType: EDailyGlobalData.transactionsCount
	},
	{
		title: 'Last 24h Power Consumption',
		valueType: EGlobalData.powerConsumption,
		dailyChangeType: EGlobalData.powerConsumption,
		unit: 'W/h',
		dailyChange: 0,
		dailyChangeColorReversed: true,
		iconSrc: '/assets/images/icons/flash.svg',
		dailyChangeUnit: '%',
		chartTitle: 'Daily Power Consumption',
		chartType: EChartType.bar,
		chartDataType: EDailyGlobalData.powerConsumption
	}
];

const HomeData: FC = () => {
	return (
		<section>
			<Flex fullWidth as='ul' wrapItems horizontal={EFlex.between} mdDirection={EFlex.column}>
				{HOMECARD_DATA.map((card) => (
					<HomeCard key={card.title} {...card} />
				))}
			</Flex>
		</section>
	);
};

export { HomeData };
