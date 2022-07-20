import styled, { css } from 'styled-components';
import { addPaddingStyles, addTransition } from '../../utils/functions';

export const StyledBMCardContainer = styled.div<any>`
	${(p) => css`
		position: relative;
		z-index: 2;

		${addTransition()}

		border-radius: 30px;

		border: 1px solid;
		align-self: stretch;

		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			border-radius: 30px;

			background: linear-gradient(142.69deg, ${p.theme.colors.bg} 4.17%, ${p.theme.colors.bg} 98.61%);
			opacity: 0.5;
			box-shadow: inset 0px 12px 24px #00000030;

			border: 2px solid ${p.theme.colors.deepBlue}20;

			background-clip: content-box;
		}

		& > span {
			display: block;
			${addPaddingStyles(p)}
		}
	`}
`;

export const StyledHoverGlow = styled.span<{ isVisible: boolean }>`
	position: absolute;
	z-index: 999;

	width: 600px;
	height: 600px;

	border-radius: 100%;

	margin-left: -300px;
	margin-top: -300px;

	user-select: none;
	pointer-events: none;

	background-image: ${(p) =>
		`radial-gradient(ellipse at center, ${p.theme.colors.deepBlue + '20'} 0%, ${p.theme.colors.deepBlue + '00'} 50%);`};

	${addTransition('opacity', 0.4)}

	${(p) =>
		p.isVisible
			? `
		opacity: 0.5;
	`
			: `
		opacity: 0;
	`}
`;

export const SytledFullContainer = styled.div<any>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: 100;

	border-radius: 30px;

	pointer-events: none;
	user-select: none;

	overflow: hidden;
`;
