import React, { FC, useEffect, useReducer, useRef, useState } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import BMHeading from '../../../styles/theme/components/BMHeading';
import BMText from '../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize, ETextAlign, ETextColor, ETextType, ETextWeight } from '../../../styles/theme/utils/enum';
import { IDataCard } from './DataCard.type';
import CountUp from 'react-countup';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import Flex from '../../../styles/layout/Flex';
import BMIcon from '../../../styles/theme/components/BMIcon';
import useResponsive from '../../../hooks/useResponsive';

// hte ping with the api
const ping = 1.5;

const DataCard: FC<IDataCard> = ({
	value,
	icon = EIcon.none,
	label,
	unit,
	index,
	isAnimated = false,
	isTimer = false,
	colorAnimationOnUpdate = false,
	reverseColor = false,
	...otherProps
}) => {
	const { isSmallerThanSm, isSmallerThanLg } = useResponsive();

	const [timerValue, updateValue] = useReducer(() => {
		const newVal = (Date.now() - value * 1000) / 1000;

		return newVal - ping > 0 ? newVal - ping : 0;
	}, 0);

	const cardRef = useRef<number>(0);

	const [valueColor, setValueColor] = useState<ETextColor>(ETextColor.default);

	useEffect(() => {
		if (isTimer) {
			setInterval(() => {
				updateValue();
			}, 100);
		}
	}, [isTimer]);

	useEffect(() => {
		if (!colorAnimationOnUpdate) {
			return;
		}

		if (value) {
			setValueColor(
				cardRef.current > value
					? reverseColor
						? ETextColor.negative
						: ETextColor.positive
					: !reverseColor
					? ETextColor.negative
					: ETextColor.positive
			);

			cardRef.current = value;

			setTimeout(() => {
				setValueColor(ETextColor.default);
			}, 700);
		}
	}, [value, colorAnimationOnUpdate, reverseColor]);

	return (
		<BMCardContainer
			animateApparition={index}
			padding={ESize.m}
			smPaddingX={ESize.s}
			smPaddingY={ESize.xs}
			{...otherProps}
		>
			<Flex direction={EFlex.column} lgDirection={EFlex.row} vertical={EFlex.center} smHorizontal={EFlex.between}>
				<BMIcon
					type={icon}
					size={isSmallerThanSm ? ESize.xs : isSmallerThanLg ? ESize.s : ESize.m}
					backgroundVisible
					backgroundSize={isSmallerThanSm ? ESize.s : isSmallerThanLg ? ESize.s : ESize.m}
					backgroundRadius={isSmallerThanSm ? ESize['2xs'] : undefined}
				/>

				<Spacing size={ESize.m} smSize={ESize.xs} />

				<div>
					<BMText
						singleLine
						textAlign={!isSmallerThanLg ? ETextAlign.center : isSmallerThanSm ? ETextAlign.right : ETextAlign.left}
						textColor={valueColor}
						weight={ETextWeight.semiBold}
						size={ESize['2xl']}
					>
						{isAnimated ? (
							<CountUp preserveValue end={value} duration={0.1} separator=',' style={{ color: 'inherit' }} />
						) : isTimer ? (
							<CountUp
								preserveValue
								end={timerValue}
								duration={0.1}
								decimal='.'
								decimals={1}
								style={{ color: 'inherit' }}
							/>
						) : (
							value
						)}

						{unit ? ` ${unit}` : <></>}
					</BMText>

					<Spacing size={ESize.m} lgSize={ESize['2xs']} />

					<BMText
						size={ESize.m}
						textAlign={!isSmallerThanLg ? ETextAlign.center : isSmallerThanSm ? ETextAlign.right : ETextAlign.left}
					>
						{label}
					</BMText>
				</div>
			</Flex>
		</BMCardContainer>
	);
};

export { DataCard };
