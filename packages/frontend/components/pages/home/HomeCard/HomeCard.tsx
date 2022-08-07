import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMGradientSeparator from '../../../../styles/theme/components/BMGradientSeparator';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import BMText from '../../../../styles/theme/components/BMText';
import { EChartType, EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';
import { axiosRest } from '../../../../utils/variables';
import BarChart from '../../../charts/BarChart';
import LineChart from '../../../charts/LineChart';
import { IHomeCardData } from '../HomeData/HomeData.type';
import { StyledIcon, StyledIconContainer } from './HomeCard.styles';
import CountUp from 'react-countup';
import { IDailyChangeValue } from './HomeCard.type';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import { getEngNotation } from '../../../../utils/convert';
import { IEngineeringNotation } from '../../../../types/maths';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import HelpTooltip from '../../../utils/HelpTooltip';
import ElementTooltip from '../../../utils/ElementTooltip';

const HomeCard: FC<IHomeCardData> = ({
	title,
	valueType,
	dailyChangeType,
	dailyCustomLabel = '24h',
	wsMessage,
	subscribeChannel,
	refreshTime = 0,
	unit,
	dailyChangeUnit,
	dailyChangeColorReversed,
	icon,
	chartTitle,
	chartType,
	chartDataType,
	helpText,
	...otherProps
}) => {
	const [value, setValue] = useState<number>(0);
	const [updatedValue, setUpdatedValue] = useState<number>(0);
	const [dailyChange, setDailyChange] = useState<number>(0);
	const [updatedDailyChange, setUpdatedDailyChange] = useState<number>(0);

	const formattedValue = useMemo<IEngineeringNotation>(() => {
		// convert value to ingeniery notation
		return getEngNotation(updatedValue, unit);
	}, [updatedValue, unit]);

	const formattedInitialValue = useMemo<number>(() => {
		// convert value to ingeniery notation
		let newValue: number = value;

		newValue = getEngNotation(newValue).value;

		return newValue;
	}, [value]);

	const formattedDailyChange = useMemo<IDailyChangeValue>(() => {
		// convert value to ingeniery notation
		let newValue: number = updatedDailyChange;
		let newUnit: string | undefined = '';

		// round to 2 decimal places
		newValue = Math.round(newValue * 100) / 100;

		// add unit if needed
		if (dailyChangeUnit) {
			if (dailyChangeUnit === '%') {
				newUnit = `${dailyChangeUnit}`;
			} else {
				newUnit = ` ${dailyChangeUnit}`;
			}
		}

		return {
			symbol: updatedDailyChange > 0 ? '+' : '',
			value: newValue,
			unit: newUnit,
			periodLabel: ' (' + dailyCustomLabel + ')'
		};
	}, [updatedDailyChange, dailyChangeUnit, dailyCustomLabel]);

	const formattedInitialDailyChange = useMemo<number>(() => {
		// convert value to ingeniery notation
		let newValue: number = dailyChange;

		// round to 2 decimal places
		newValue = Math.round(newValue * 100) / 100;

		return newValue;
	}, [dailyChange]);

	const dailyTextColor = useMemo(() => {
		let positive = ETextColor.positive;
		let negative = ETextColor.negative;

		if (dailyChangeColorReversed) {
			positive = ETextColor.negative;
			negative = ETextColor.positive;
		}

		if (dailyChange > 0) {
			return positive;
		} else if (dailyChange < 0) {
			return negative;
		}

		return ETextColor.default;
	}, [dailyChange, dailyChangeColorReversed]);

	const fetchValue = useCallback(async () => {
		try {
			const { data } = await axiosRest('/blockchains/total?type=' + valueType);
			setValue(data.value || 0);
			setUpdatedValue(data.value || 0);
		} catch (err) {
			console.error('HomeCard fetchData', err);
		}
	}, [valueType]);

	const fetchDailyChange = useCallback(async () => {
		try {
			const { data } = await axiosRest('/blockchains/total?type=' + dailyChangeType);

			setDailyChange(data.value || 0);
			setUpdatedDailyChange(data.value || 0);
		} catch (err) {
			console.error('HomeCard fetchData', err);
		}
	}, [dailyChangeType]);

	const updateValue = useCallback(
		(newValue: number) => {
			setUpdatedDailyChange(newValue);
			setUpdatedValue(Number(value) + newValue);
		},
		[value]
	);

	useEffect(() => {
		if (subscribeChannel && wsMessage?.channel === subscribeChannel) {
			const numberMessage = parseInt(wsMessage?.data, 10);

			updateValue(numberMessage);
		}
	}, [wsMessage, value, subscribeChannel, updateValue]);

	useEffect(() => {
		valueType && fetchValue();
	}, [fetchValue, valueType]);

	useEffect(() => {
		dailyChangeType && fetchDailyChange();
	}, [fetchDailyChange, dailyChangeType]);

	return (
		<BMCardContainer as='li' animateApparition {...otherProps}>
			<Flex>
				<StyledIconContainer>
					<BMIcon type={icon} size={ESize.m} />
				</StyledIconContainer>

				<Spacing size={ESize.s} />

				<Flex direction={EFlex.column}>
					<Flex horizontal={EFlex.between} vertical={EFlex.center}>
						<BMText as='h2' size={ESize.m} weight={ETextWeight.light}>
							{title}
						</BMText>

						{helpText && <HelpTooltip content={helpText} />}
					</Flex>

					<Spacing size={ESize.xs} mdSize={ESize['3xs']} />

					<ElementTooltip content={formattedValue.fullToString}>
						<BMHeading type={ETextType.h3} weight={ETextWeight.semiBold} loading={!formattedInitialValue}>
							<CountUp
								preserveValue={true}
								start={formattedInitialValue}
								end={formattedValue.value}
								duration={refreshTime}
								decimals={formattedValue.hasDecimals ? 2 : 0}
								suffix={formattedValue.unit}
								separator=','
								style={{ color: 'inherit' }}
							/>
						</BMHeading>
					</ElementTooltip>

					<Spacing size={ESize.xs} mdSize={ESize['3xs']} />

					{dailyChange ? (
						<BMText size={ESize.s} weight={ETextWeight.light} textColor={dailyTextColor}>
							<CountUp
								preserveValue={true}
								start={formattedInitialDailyChange}
								end={formattedDailyChange.value}
								duration={refreshTime}
								decimals={0}
								prefix={formattedDailyChange.symbol}
								suffix={formattedDailyChange.unit + formattedDailyChange.periodLabel}
								separator=','
								style={{ color: 'inherit' }}
							/>
						</BMText>
					) : (
						<></>
					)}
				</Flex>
			</Flex>

			<BMGradientSeparator margin={ESize.xl} mdMargin={ESize.s} lgMargin={ESize.m} />

			<BMText size={ESize.m} weight={ETextWeight.medium}>
				{chartTitle}
			</BMText>

			<Spacing size={ESize.xs} />

			{chartType === EChartType.line ? (
				<LineChart dailyType={chartDataType} deactivateLegend chartHeight={120} />
			) : chartType === EChartType.bar ? (
				<BarChart dailyType={chartDataType} deactivateLegend chartHeight={120} />
			) : (
				<></>
			)}
		</BMCardContainer>
	);
};

export { HomeCard };
