import React, { FC, useCallback, useMemo, useState } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import BMIcon from '../../../styles/theme/components/BMIcon';
import BMText from '../../../styles/theme/components/BMText';
import { EIcon, ESize } from '../../../styles/theme/utils/enum';
import { StyledHelpTooltipContainer, StyledTooltip } from './HelpTooltip.styles';
import Portal from '../Portal';
import { v4 as uuidV4 } from 'uuid';

const HelpTooltip: FC<{ content: string }> = ({ content }) => {
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

	return (
		<>
			<Portal>
				{tooltipPosition && (
					<StyledHelpTooltipContainer isVisible={isVisible} style={tooltipPosition}>
						<BMText size={ESize.s}>{content}</BMText>
					</StyledHelpTooltipContainer>
				)}
			</Portal>

			<StyledTooltip onMouseEnter={(e: any) => onMouseEnter(e)} onMouseLeave={() => onMouseLeave()}>
				<Spacing size={ESize['4xs']} />

				<BMIcon
					type={EIcon.help}
					size={ESize['2xs']}
					backgroundVisible
					backgroundSize={ESize['5xs']}
					backgroundRadius={ESize.xl}
				/>
			</StyledTooltip>
		</>
	);
};

export { HelpTooltip };
