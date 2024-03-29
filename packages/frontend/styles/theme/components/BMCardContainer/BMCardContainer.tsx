import React, { FC, useEffect, useMemo, useState } from 'react';
import { IBMCardContainer } from './BMCardContainer.type';
import { v4 as uuidv4 } from 'uuid';
import { StyledBMCardContainer, StyledHoverGlow, SytledFullContainer } from './BMCardContainer.styles';
import { ESize } from '../../utils/enum';

const BMCardContainer: FC<IBMCardContainer> = ({
	children,
	clickable = false,
	isHighlighted = false,
	secondary = false,
	tertiary = false,
	fullWidth = false,
	fullHeight = false,
	borderRadius = ESize.m,
	...otherProps
}) => {
	const glowContainerUuid = useMemo(() => {
		return uuidv4();
	}, []);

	const [isVisible, setIsVisible] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [windowMounted, setWindowMounted] = useState(false);

	const onMouseEnter = () => {
		try {
			// @ts-ignore
			clearTimeout(window[`timer-${glowContainerUuid}`]);
		} catch {
			// fallback
		}

		setIsVisible(true);
	};

	const onMouseLeave = () => {
		try {
			// @ts-ignore
			window[`timer-${glowContainerUuid}`] = setTimeout(() => {
				setIsVisible(false);
			}, 100);
		} catch (err) {
			console.error(err);
		}
	};

	const onMouseMove = (e: MouseEvent) => {
		const parent = document.getElementById(glowContainerUuid);

		const { left, top } = parent?.getBoundingClientRect() || {};

		if (!left || !top) {
			return;
		}

		setMousePos({ x: e.clientX - left, y: e.clientY - top });
	};

	const position = useMemo(() => {
		if (typeof window === 'undefined') {
			return {};
		}
		return {
			left: `${mousePos.x}px`,
			top: `${mousePos.y}px`
		};
	}, [mousePos]);

	useEffect(() => {
		setWindowMounted(true);
	}, [windowMounted]);

	return (
		// @ts-ignore
		<StyledBMCardContainer
			onMouseMove={clickable ? (e: MouseEvent) => onMouseMove(e) : undefined}
			onMouseEnter={clickable ? () => onMouseEnter() : undefined}
			onMouseLeave={clickable ? () => onMouseLeave() : undefined}
			isHighlighted={isHighlighted}
			secondary={secondary}
			tertiary={tertiary}
			fullWidth={fullWidth}
			fullHeight={fullHeight}
			borderRadius={borderRadius}
			{...otherProps}
		>
			{windowMounted && clickable ? (
				<SytledFullContainer id={glowContainerUuid} secondary={secondary} tertiary={tertiary}>
					<StyledHoverGlow isVisible={isVisible} style={position} />
				</SytledFullContainer>
			) : (
				<></>
			)}

			<span>{children}</span>
		</StyledBMCardContainer>
	);
};

export { BMCardContainer };
