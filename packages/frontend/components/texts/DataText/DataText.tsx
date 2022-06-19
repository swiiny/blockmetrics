import React, { FC, useEffect, useReducer } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import Heading from '../../../styles/theme/components/Heading';
import Text from '../../../styles/theme/components/Text';
import { ESize, ETextColor, ETextType } from '../../../styles/theme/utils/enum';
import { IDataText } from './DataText.type';
import CountUp from 'react-countup';
import { StyledDataText } from './DataText.styles';

const DataText: FC<IDataText> = ({ as, value, label, unit, isAnimated, isTimer, ...otherProps }) => {
	const [timerValue, updateValue] = useReducer(() => {
		return (Date.now() - value * 1000) / 1000;
	}, 0);

	useEffect(() => {
		if (isTimer) {
			setInterval(() => {
				updateValue();
			}, 1000);
		}
	}, [isTimer]);

	return (
		<StyledDataText {...otherProps}>
			<Heading as='p' type={ETextType.h1}>
				{isAnimated ? (
					<CountUp preserveValue end={value} duration={0.5} separator=',' style={{ color: 'inherit' }} />
				) : isTimer ? (
					<CountUp preserveValue end={timerValue} duration={1} decimal='.' decimals={1} style={{ color: 'inherit' }} />
				) : (
					value
				)}

				{unit ? (
					<Text type={ETextType.span} inheritStyle={false} size={ESize.l} textColor={ETextColor.light}>
						{` ${unit}`}
					</Text>
				) : (
					<></>
				)}
			</Heading>

			<Spacing size={ESize['4xs']} />

			<Text size={ESize.m}>{label}</Text>
		</StyledDataText>
	);
};

export { DataText };
