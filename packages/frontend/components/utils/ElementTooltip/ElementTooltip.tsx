import React, { Children, cloneElement, FC, isValidElement, ReactNode, useCallback, useMemo, useState } from 'react';
import BMText from '../../../styles/theme/components/BMText';
import { ESize } from '../../../styles/theme/utils/enum';
import { StyledElementTooltipContainer } from './ElementTooltip.styles';
import Portal from '../Portal';
import { v4 as uuidV4 } from 'uuid';
import { IElementTooltip } from './ElementTooltip.type';

const ElementTooltip: FC<IElementTooltip> = ({ children, content, disabled = false }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState<any>(undefined);

	const uuid = useMemo(() => {
		return uuidV4();
	}, []);

	const onMouseEnter = useCallback(
		(event: MouseEvent) => {
			// @ts-ignore
			if (window[`tooltip-timer-${uuid}`]) {
				// @ts-ignore
				clearTimeout(window[`tooltip-timer-${uuid}`]);
			}

			const mousePosition = { x: event.clientX, y: event.clientY };

			setTooltipPosition({
				left: mousePosition.x < window.innerWidth / 2 ? `${mousePosition.x + 5}px` : undefined,
				top: mousePosition.y < window.innerHeight / 2 ? `${mousePosition.y + 5}px` : undefined,
				right: mousePosition.x >= window.innerWidth / 2 ? `${window.innerWidth - mousePosition.x + 5}px` : undefined,
				bottom: mousePosition.y >= window.innerHeight / 2 ? `${window.innerHeight - mousePosition.y + 5}px` : undefined
			});

			setTimeout(() => {
				setIsVisible(true);
			}, 10);
		},
		[uuid]
	);

	const onMouseLeave = useCallback(() => {
		setIsVisible(false);

		// @ts-ignore
		window[`tooltip-timer-${uuid}`] = setTimeout(() => {
			setTooltipPosition(undefined);
		}, 100);
	}, [uuid]);

	const childrenWithEventListeners = useMemo(() => {
		return Children.map(children, (child) => {
			if (isValidElement(child)) {
				return cloneElement(child, {
					onMouseEnter,
					onMouseLeave
				});
			}
			return child;
		});
	}, [children, onMouseEnter, onMouseLeave]);

	return (
		<>
			{childrenWithEventListeners}

			{!disabled ? (
				<Portal>
					{tooltipPosition && (
						<StyledElementTooltipContainer isVisible={isVisible} style={tooltipPosition}>
							<BMText size={ESize.s}>{content}</BMText>
						</StyledElementTooltipContainer>
					)}
				</Portal>
			) : (
				<></>
			)}
		</>
	);
};

export { ElementTooltip };
