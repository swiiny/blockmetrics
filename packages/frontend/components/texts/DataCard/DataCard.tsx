import React, { FC, Reducer, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import BMText from '../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize, ETextAlign, ETextColor, ETextWeight } from '../../../styles/theme/utils/enum';
import { IDataCard } from './DataCard.type';
import CountUp from 'react-countup';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import Flex from '../../../styles/layout/Flex';
import BMIcon from '../../../styles/theme/components/BMIcon';
import useResponsive from '../../../hooks/useResponsive';
import HelpTooltip from '../../utils/HelpTooltip';
import { StyledTooltip } from './DataCard.styles';
import ElementTooltip from '../../utils/ElementTooltip';

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
	helpText,
	fullValue,
	...otherProps
}) => {
	const { isSmallerThanSm, isSmallerThanMd, isSmallerThanLg } = useResponsive();

	const [timerValue, updateValue] = useReducer<Reducer<number, string>>((state, action) => {
		if (action === 'reset') {
			return 0;
		}

		return state + 0.1;
	}, (Date.now() - value * 1000) / 1000);

	const [initialValue, _] = useState<number>(value);

	const cardRef = useRef<number>(0);

	const [valueColor, setValueColor] = useState<ETextColor>(ETextColor.default);

	useEffect(() => {
		if (isTimer) {
			// @ts-ignore
			window['data-card-timer-value-interval'] && clearInterval(window['data-card-timer-value-interval']);
			// @ts-ignore
			window['data-card-timer-value-interval'] = setInterval(() => {
				updateValue('');
			}, 100);
		}
	}, [isTimer]);

	useEffect(() => {
		if (isTimer) {
			if (value > initialValue) {
				updateValue('reset');
			}
		}
	}, [value, isTimer, initialValue]);

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
			smPaddingLeft={ESize.s}
			lgPaddingRight={ESize.xl}
			smPaddingY={ESize.xs}
			borderRadius={isSmallerThanMd ? ESize.s : ESize.m}
			{...otherProps}
		>
			{helpText && (
				<StyledTooltip>
					<HelpTooltip content={helpText} />
				</StyledTooltip>
			)}

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
					<ElementTooltip content={fullValue} disabled={!fullValue}>
						<BMText
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
					</ElementTooltip>

					<Spacing size={ESize.m} lgSize={ESize['2xs']} smSize={ESize.unset} />

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
