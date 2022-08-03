import React, { FC, useEffect, useRef, useState } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, ESize, ETextColor, ETextWeight } from '../../../../styles/theme/utils/enum';
import { ICompareData } from '../CompareBlockchains/CompareBlockchains.type';
import CountUp from 'react-countup';

const CompareBlockchainData: FC<ICompareData> = ({
	label,
	value,
	unit,
	icon,
	colorAnimationOnUpdate = false,
	reverseColor = false,
	isAnimated = false
}) => {
	const [valueColor, setValueColor] = useState<ETextColor>(ETextColor.default);

	const dataRef = useRef<number>(0);

	useEffect(() => {
		if (!colorAnimationOnUpdate) {
			return;
		}

		if (value) {
			setValueColor(
				dataRef.current > value
					? reverseColor
						? ETextColor.negative
						: ETextColor.positive
					: !reverseColor
					? ETextColor.negative
					: ETextColor.positive
			);

			dataRef.current = value;

			setTimeout(() => {
				setValueColor(ETextColor.default);
			}, 700);
		}
	}, [value, colorAnimationOnUpdate, reverseColor]);

	return (
		<div>
			<Flex vertical={EFlex.center}>
				<BMIcon size={ESize.xs} type={icon} />

				<Spacing size={ESize['4xs']} />

				<BMText size={ESize.s}>{label}</BMText>
			</Flex>

			<Spacing size={ESize.xs} />

			<BMText textColor={valueColor} weight={ETextWeight.semiBold} size={ESize.l} marginLeft={ESize.m}>
				{isAnimated ? (
					<CountUp preserveValue end={value} duration={1} separator=',' style={{ color: 'inherit' }} />
				) : (
					value
				)}

				{unit ? ` ${unit}` : <></>}
			</BMText>
		</div>
	);
};

export { CompareBlockchainData };
