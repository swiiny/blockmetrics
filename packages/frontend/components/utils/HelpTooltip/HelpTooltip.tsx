import React, { FC, useCallback, useState } from 'react';
import Spacing from '../../../styles/layout/Spacing';
import BMIcon from '../../../styles/theme/components/BMIcon';
import BMText from '../../../styles/theme/components/BMText';
import { EIcon, ESize } from '../../../styles/theme/utils/enum';
import { StyledHelpTooltipContainer, StyledTooltip } from './HelpTooltip.styles';
import Portal from '../Portal';

const HelpTooltip: FC<{ content: string }> = ({ content }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const onMouseMove = useCallback((event: MouseEvent) => {
		setMousePosition({ x: event.clientX, y: event.clientY });
	}, []);

	const tooltipPosition =
		typeof window !== 'undefined'
			? {
					left: mousePosition.x < window.innerWidth / 2 ? `${mousePosition.x + 10}px` : undefined,
					top: mousePosition.y < window.innerHeight / 2 ? `${mousePosition.y + 5}px` : undefined,
					right: mousePosition.x >= window.innerWidth / 2 ? `${window.innerWidth - mousePosition.x + 5}px` : undefined,
					bottom:
						mousePosition.y >= window.innerHeight / 2 ? `${window.innerHeight - mousePosition.y + 5}px` : undefined
			  }
			: {};

	return (
		<>
			<Portal selector='body'>
				<StyledHelpTooltipContainer isVisible={isVisible} style={tooltipPosition}>
					<BMText size={ESize.s}>{content}</BMText>
				</StyledHelpTooltipContainer>
			</Portal>

			<StyledTooltip
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				onMouseMove={(e: any) => onMouseMove(e)}
			>
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
