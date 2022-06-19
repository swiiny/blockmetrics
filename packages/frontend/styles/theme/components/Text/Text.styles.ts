import { addTransition, getTextColor, setFontSize } from '../../utils/functions';
import styled, { css } from 'styled-components';
import { ESize, ETextColor, ETextWeight } from '../../utils/enum';

const generateTextStyle = (p: any) => {
	return css`
		${setFontSize(p.size)}
		${addTransition()}

		font-weight: normal;
		letter-spacing: -0.02em;
		text-align: ${p.textAlign};

		${p.singleLine ? 'line-height: 1rem;' : ''}
		${p.inheritStyle
			? css`
					font-size: inherit;
					font-weight: inherit;
					letter-spacing: inherit;
					text-align: inherit;
					line-height: inherit;
			  `
			: `
	`}

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

export const StyledTextParagraph = styled.p<{
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
	opacityReduced?: boolean;
}>`
	${(p) => generateTextStyle(p)}
`;

export const StyledTextLink = styled.a<{
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: string;
	disabled?: boolean;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
	decoration?: boolean;
	opacityReduced?: boolean;
}>`
	${(p) => generateTextStyle(p)}

	${(p) =>
		p.decoration
			? css`
					text-decoration: underline dotted;
					text-decoration-thickness: 1px;
					text-underline-offset: 1ex;
					text-decoration-color: ${p.theme.colors.text.default + '30'};
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

export const StyledTextSpan = styled.span<{
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
	inheritStyle?: boolean;
	opacityReduced?: boolean;
}>`
	${(p) => generateTextStyle(p)}
`;
