import styled from 'styled-components';
import { EMediaQuery } from '../../../styles/theme/utils/enum';
import { addTransition, mq } from '../../../styles/theme/utils/functions';

export const StyledTooltip = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
`;

export const StyledHelpTooltipContainer = styled.div<{ isVisible: boolean }>`
	position: fixed;
	//top: 120%;
	//left: calc(50%);

	z-index: 100;

	padding: 8px;

	background-color: ${(p) => p.theme.colors.bg};

	border-radius: 5px;

	max-width: 70vw;
	max-height: 50vh;

	border: 1px solid ${(p) => p.theme.colors.deepBlue};

	filter: drop-shadow(0px 0px 25px ${(p) => p.theme.colors.bg + '50'});

	${addTransition()}

	${mq(
		EMediaQuery.md,
		`
		left: calc(50% - 150px);
	`
	)}

	${(p) =>
		p.isVisible
			? `
		opacity: 1;
		pointer-events: all;
		transform: translateY(0);
	`
			: `
		opacity: 0;
		pointer-events: none;
		transform: translateY(5px);
	`}

	&::after {
		content: ' ';
	}
`;
