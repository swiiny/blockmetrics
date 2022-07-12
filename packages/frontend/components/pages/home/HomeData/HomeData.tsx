import React, { FC, useCallback, useEffect } from 'react';
import Flex from '../../../../styles/layout/Flex';
import { EChartType, EFlex } from '../../../../styles/theme/utils/enum';
import HomeCard from '../HomeCard';
import { IHomeCardData } from './HomeData.type';

const PLACEHOLDER_DATA: IHomeCardData[] = [
	{
		title: 'Total Users Count',
		value: 79120000,
		dailyChange: 10354137,
		iconSrc: '/assets/images/icons/profile-tick.svg',
		chartTitle: 'Global Active Users',
		chartType: EChartType.bar,
		chartData: []
	},
	{
		title: 'Total Transactions Count',
		value: 2109000000000,
		dailyChange: 350675,
		iconSrc: '/assets/images/icons/arrow-swap-horizontal.svg',
		chartTitle: 'Transactions Per Seconds',
		chartType: EChartType.line,
		chartData: []
	},
	{
		title: 'Last 24h Power Consumption',
		value: 10350000000000,
		unit: 'W/h',
		dailyChange: 0.28,
		dailyChangeColorReversed: true,
		iconSrc: '/assets/images/icons/flash.svg',
		dailyChangeUnit: '%',
		chartTitle: 'Total Power Consumption',
		chartType: EChartType.line,
		chartData: []
	}
];

const HomeData: FC = () => {
	const [cards, setCards] = React.useState<IHomeCardData[]>([]);

	const fetchData = useCallback(async () => {
		// @todo(fetch total users count)
		// @todo(fetch total transaction count)
		// @todo(fetch total power consumption)

		setCards(PLACEHOLDER_DATA);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<section>
			<Flex fullWidth as='ul' horizontal={EFlex.between}>
				{cards.map((card) => (
					<HomeCard key={card.title} {...card} />
				))}
			</Flex>
		</section>
	);
};

export { HomeData };
