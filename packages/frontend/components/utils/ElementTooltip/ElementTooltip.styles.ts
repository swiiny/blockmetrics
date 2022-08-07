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

export const StyledElementTooltipContainer = styled.div<{ isVisible: boolean }>`
	position: fixed;
	z-index: 100;

	background-color: ${(p) => p.theme.colors.bg};

	max-width: 30vw;
	max-height: 50vh;

	padding: 7px 12px;
	border-radius: 10px;
	border: 1px solid #474747;
	box-shadow: 0px 12px 24px 0px #0000004d inset;
	background-color: #31393e;

	${addTransition()}

	${mq(
		EMediaQuery.md,
		`
		left: calc(50% - 150px);
		max-width: 70vw;
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
