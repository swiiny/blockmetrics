import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, ESize, ETextColor, ETextWeight } from '../../../../styles/theme/utils/enum';
import { ICompareData } from '../CompareBlockchains/CompareBlockchains.type';
import CountUp from 'react-countup';
import { StyledCompareBlockchainData } from './CompareBlockchainData.styles';

const CompareBlockchainData: FC<ICompareData> = ({
	label,
	value,
	unit,
	icon,
	colorAnimationOnUpdate = false,
	reverseColor = false,
	isAnimated = false,
	loading = false
}) => {
	const [valueColor, setValueColor] = useState<ETextColor>(ETextColor.default);

	const dataRef = useRef<number>(0);

	const isEmpty = useMemo(() => {
		return label.includes('empty');
	}, [label]);

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
		<StyledCompareBlockchainData>
			<Flex vertical={EFlex.center}>
				<BMIcon size={ESize.xs} type={icon} loading={loading} skWidth={25} />

				<Spacing size={ESize['4xs']} />

				<BMText size={ESize.s} loading={loading} skWidth='50%'>
					{isEmpty ? '' : label}
				</BMText>
			</Flex>

			<Spacing size={ESize['2xs']} smSize={ESize['7xs']} mdSize={ESize['3xs']} />

			<BMText
				textColor={valueColor}
				weight={ETextWeight.semiBold}
				size={ESize.l}
				marginLeft={ESize.m}
				loading={loading}
			>
				{isAnimated ? (
					<CountUp preserveValue end={value} duration={1} separator=',' style={{ color: 'inherit' }} />
				) : isEmpty ? (
					'-'
				) : (
					value
				)}

				{unit ? ` ${unit}` : <></>}
			</BMText>
		</StyledCompareBlockchainData>
	);
};

export { CompareBlockchainData };
