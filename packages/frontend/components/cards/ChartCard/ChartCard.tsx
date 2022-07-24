import React, { FC } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import BMText from '../../../styles/theme/components/BMText';
import { EChartType, ESize, ETextWeight } from '../../../styles/theme/utils/enum';
import BarChart from '../../charts/BarChart';
import LineChart from '../../charts/LineChart';
import { IChartCard } from './ChartCard.type';

const ChartCard: FC<IChartCard> = ({
	label,
	legendHidden = false,
	chartType,
	decimals,
	dailyType,
	unit,
	chainId,
	...otherProps
}) => {
	return (
		<BMCardContainer as='li' {...otherProps} animateApparition={5}>
			<BMText size={ESize.m} weight={ETextWeight.medium}>
				{label}
			</BMText>

			<Spacing size={ESize.xs} />
			{chartType === EChartType.bar ? (
				<BarChart
					dailyType={dailyType}
					unit={unit}
					decimals={decimals}
					chainId={chainId}
					deactivateLegend={legendHidden}
				/>
			) : (
				<LineChart
					dailyType={dailyType}
					unit={unit}
					decimals={decimals}
					chainId={chainId}
					deactivateLegend={legendHidden}
				/>
			)}
		</BMCardContainer>
	);
};

export { ChartCard };
