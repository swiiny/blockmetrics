import React, { useEffect, useReducer } from 'react';
import Spacing from '../../../../styles/layout/Spacing';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import { ESize, ETextAlign, ETextColor, ETextType } from '../../../../styles/theme/utils/enum';
import { ITitleAndValue } from './TitleAndValue.type';
import CountUp from 'react-countup';

const TitleAndValue: React.FC<ITitleAndValue> = ({ title, value, unit = null, customDuration, ...otherProps }) => {
	const [initValue, setInitValue] = useReducer((_: number, value: number) => {
		if (value < 0) {
			return 0;
		} else {
			return value;
		}
	}, 0);

	useEffect(() => {
		if (initValue === 0 && value > 0) {
			// reduce the initial value to get an animation effect
			setInitValue(value - 10000);
		}
	}, [initValue, value]);

	return (
		<div {...otherProps}>
			<BMHeading as={ETextType.p} type={ETextType.h4} textAlign={ETextAlign.center}>
				{title}
			</BMHeading>

			<Spacing size={ESize['4xs']} />

			<BMHeading as={ETextType.p} type={ETextType.h1} textAlign={ETextAlign.center} textColor={ETextColor.green}>
				<CountUp
					preserveValue
					start={initValue}
					end={value}
					duration={customDuration || 1}
					decimals={0}
					suffix={unit ? ' ' + unit : ''}
					separator=','
					style={{ color: 'inherit' }}
				/>
			</BMHeading>
		</div>
	);
};

export { TitleAndValue };
