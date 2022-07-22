import styled, { css } from 'styled-components';
import { addPaddingStyles, addTransition } from '../../utils/functions';

export const StyledBMCardContainer = styled.div<any>`
	${(p) => css`
		position: relative;
		z-index: 2;

		${addTransition()}

		${p.fullWidth ? `width: 100%;` : ''}
		${p.fullHeight ? `height: 100%;` : ''}

		${!p.secondary
			? css`
					align-self: stretch;
					border-radius: 30px;
			  `
			: css`
					border-radius: 10px;
			  `}

		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;

			${p.secondary
				? css`
						border-radius: 10px;
						background: ${p.theme.colors.gradient.toBottom};
						opacity: 0.15;

						box-shadow: 0px 10px 20px rgba(69, 189, 230, 0.15), inset 0px 4px 7px rgba(36, 94, 114, 0.44);
				  `
				: p.tertiary
				? css`
						border-radius: 10px;
						opacity: 0.15;

						background: ${p.theme.colors.darkGrey};
				  `
				: css`
						border-radius: 30px;
						background: linear-gradient(142.69deg, ${p.theme.colors.bg} 4.17%, ${p.theme.colors.bg} 98.61%);
						opacity: 0.5;
						box-shadow: inset 0px 12px 24px #00000030;

						border: 2px solid ${p.theme.colors.deepBlue}20;
				  `}

			${p.isHighlighted
				? `
				border: 2px solid ${p.theme.colors.deepBlue}75;
			`
				: ''}

			background-clip: content-box;
		}

		& > span {
			display: block;
			${addPaddingStyles(p)}

			${p.fullWidth ? `width: 100%;` : ''}
			${p.fullHeight ? `height: 100%;` : ''}
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

export const SytledFullContainer = styled.div<{ secondary?: boolean; tertiary?: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: 100;

	border-radius: ${(p) => (p.secondary || p.tertiary ? '10px' : '30px')};

	pointer-events: none;
	user-select: none;

	overflow: hidden;
`;
