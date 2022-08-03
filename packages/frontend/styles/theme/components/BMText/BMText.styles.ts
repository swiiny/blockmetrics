import { addMarginStyles, addTransition, getTextColor, setFontSize } from '../../utils/functions';
import styled, { css } from 'styled-components';
import { ESize, ETextColor, ETextWeight } from '../../utils/enum';
import { IBMText } from './BMText.type';

const generateTextStyle = (p: any) => {
	return css`
		position: relative;

		${setFontSize(p.size)}
		${addTransition()}
		${addMarginStyles(p)}

		font-weight: normal;
		text-align: ${p.textAlign};
		text-transform: ${p.textTransform};

		${p.singleLine ? 'line-height: 1rem;' : ''}
		${p.inheritStyle
			? css`
					font-size: inherit !important;
					font-weight: inherit;
					letter-spacing: inherit;
					text-align: inherit;
					line-height: inherit;
			  `
			: ``}

		&::before {
			content: ' ';
			position: absolute;

			${addTransition()}

			bottom: -7px;
			left: 5px;

			height: 3px;
			width: 0%;

			border-radius: 2px;

			background-color: ${p.theme.colors.primary};
		}

		&.navbar-active::before {
			width: 60%;
		}

		${p.textColor === ETextColor.gradient
			? css`
					background: ${p.theme.colors.gradient.toRight};
					${() => '-webkit-background-clip: text;'}
					-webkit-text-fill-color: transparent;
			  `
			: `color: ${getTextColor(p)}`}

		${p.weight ? `font-weight: ${p.weight} !important;` : ''}
		${p.opacityReduced ? `opacity: 0.7` : ''}
	`;
};

export const StyledTextParagraph = styled.p<IBMText>`
	${(p) => generateTextStyle(p)}
`;

export const StyledTextLink = styled.a<IBMText>`
	${(p) => generateTextStyle(p)}

	${(p) =>
		p.underline
			? css`
					text-decoration: underline;
			  `
			: css`
					text-decoration: none;
			  `}

	${(p) =>
		p.disabled
			? css`
					opacity: 0.3;
					cursor: default;
			  `
			: css`
					&:hover {
						color: ${p.theme.colors.text.accent};
						text-decoration-color: ${p.theme.colors.text.accent + '30'};
					}
			  `}
`;

export const StyledTextSpan = styled.span<IBMText>`
	${(p) => generateTextStyle(p)}
`;
