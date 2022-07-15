import React from 'react';
import Spacing from '../../../../styles/layout/Spacing';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import { ESize, ETextAlign, ETextColor, ETextType } from '../../../../styles/theme/utils/enum';
import { ITitleAndValue } from './TitleAndValue.type';
import CountUp from 'react-countup';

const TitleAndValue: React.FC<ITitleAndValue> = ({ title, value, unit = null, ...otherProps }) => {
	return (
		<div {...otherProps}>
			<BMHeading as={ETextType.p} type={ETextType.h4} textAlign={ETextAlign.center}>
				{title}
			</BMHeading>

			<Spacing size={ESize['4xs']} />

			<BMHeading as={ETextType.p} type={ETextType.h1} textAlign={ETextAlign.center} textColor={ETextColor.green}>
				<CountUp
					start={0}
					end={value}
					duration={2}
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
