import React, { FC } from 'react';
import Flex from '../../../styles/layout/Flex';
import Spacing from '../../../styles/layout/Spacing';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import BMText from '../../../styles/theme/components/BMText';
import { EChartType, EFlex, ESize, ETextTransform, ETextWeight } from '../../../styles/theme/utils/enum';
import BarChart from '../../charts/BarChart';
import LineChart from '../../charts/LineChart';
import HelpTooltip from '../../utils/HelpTooltip';
import { IChartCard } from './ChartCard.type';

const ChartCard: FC<IChartCard> = ({
	label,
	legendHidden = false,
	chartType,
	decimals,
	dailyType,
	unit,
	chainId,
	helpText,
	...otherProps
}) => {
	return (
		<BMCardContainer as='li' {...otherProps} animateApparition={5}>
			<Flex vertical={EFlex.center} horizontal={EFlex.between}>
				<BMText size={ESize.m} weight={ETextWeight.medium} textTransform={ETextTransform.capitalize}>
					{label}
				</BMText>

				{helpText && <HelpTooltip content={helpText} />}
			</Flex>

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
