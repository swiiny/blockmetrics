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
import { StyledHomeCard, StyledIcon, StyledIconContainer } from './HomeCard.styles';

const HomeCard: FC<IHomeCardData> = ({
	title,
	valueType,
	unit,
	dailyChangeUnit,
	dailyChangeColorReversed,
	iconSrc,
	chartTitle,
	chartType,
	chartDataType,
	...otherProps
}) => {
	const [valueData, setValueData] = useState<{ value: number; dailyChange: number }>({
		value: 0,
		dailyChange: 0
	});

	const formattedValue = useMemo(() => {
		const { value } = valueData;
		// convert value to ingeniery notation
		let newValue: string = `${value}`;

		if (value >= 10 ** 15) {
			newValue = `${(value / 10 ** 12).toLocaleString(undefined, { maximumFractionDigits: 2 })} T`;
		} else if (value >= 10 ** 12) {
			newValue = `${(value / 10 ** 9).toLocaleString(undefined, { maximumFractionDigits: 2 })} G`;
		} else if (value >= 10 ** 9) {
			newValue = `${(value / 10 ** 6).toLocaleString(undefined, { maximumFractionDigits: 2 })} M`;
		} else if (value >= 10 ** 6) {
			newValue = `${(value / 10 ** 3).toLocaleString(undefined, { maximumFractionDigits: 2 })} k`;
		}

		// add unit if needed
		if (unit) {
			if (newValue.indexOf(' ') !== -1) {
				newValue = `${newValue}${unit}`;
			} else {
				newValue = `${newValue} ${unit}`;
			}
		}

		return newValue;
	}, [valueData.value, unit]);

	const formattedDailyChange = useMemo(() => {
		const { dailyChange } = valueData;

		// convert value to ingeniery notation
		let newValue: string = `${dailyChange}`;

		if (dailyChange >= 10 ** 15) {
			newValue = `${(dailyChange / 10 ** 12).toLocaleString(undefined, { maximumFractionDigits: 2 })} T`;
		} else if (dailyChange >= 10 ** 12) {
			newValue = `${(dailyChange / 10 ** 9).toLocaleString(undefined, { maximumFractionDigits: 2 })} G`;
		} else if (dailyChange >= 10 ** 9) {
			newValue = `${(dailyChange / 10 ** 6).toLocaleString(undefined, { maximumFractionDigits: 2 })} M`;
		} else if (dailyChange >= 10 ** 6) {
			newValue = `${(dailyChange / 10 ** 3).toLocaleString(undefined, { maximumFractionDigits: 2 })} k`;
		}

		// add unit if needed
		if (dailyChangeUnit) {
			if (dailyChangeUnit === '%') {
				newValue = `${newValue}${dailyChangeUnit}`;
			} else if (newValue.indexOf(' ') !== -1) {
				newValue = `${newValue}${dailyChangeUnit}`;
			} else {
				newValue = `${newValue} ${dailyChangeUnit}`;
			}
		}

		if (dailyChange > 0) {
			newValue = `+${newValue}`;
		}

		return newValue + ' (24h)';
	}, [valueData.dailyChange, dailyChangeUnit]);

	const dailyTextColor = useMemo(() => {
		const { dailyChange } = valueData;
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
	}, [valueData.dailyChange, dailyChangeColorReversed]);

	const fetchData = useCallback(async () => {
		try {
			const { data } = await axiosRest('/get/blockchains/total?type=' + valueType);
			setValueData({
				value: data.value,
				dailyChange: data.dailyChange || 0
			});
		} catch (err) {
			console.error('HomeCard fetchData', err);
		}
	}, [valueType]);

	useEffect(() => {
		valueType && fetchData();
	}, [fetchData, valueType]);

	return (
		<StyledHomeCard {...otherProps}>
			<Flex>
				<StyledIconContainer>
					<StyledIcon src={iconSrc} alt='' />
				</StyledIconContainer>

				<Spacing size={ESize.s} />

				<Flex direction={EFlex.column}>
					<BMText size={ESize.m} weight={ETextWeight.light}>
						{title}
					</BMText>

					<Spacing size={ESize.xs} mdSize={ESize['3xs']} />

					<BMHeading type={ETextType.h3} weight={ETextWeight.semiBold}>
						{formattedValue}
					</BMHeading>

					<Spacing size={ESize.xs} mdSize={ESize['3xs']} />

					{valueData.dailyChange ? (
						<BMText size={ESize.s} weight={ETextWeight.light} textColor={dailyTextColor}>
							{formattedDailyChange}
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
		</StyledHomeCard>
	);
};

export { HomeCard };
