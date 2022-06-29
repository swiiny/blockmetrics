import styled from 'styled-components';
import { EMediaQuery, ETextWeight, ETextColor, ETextType } from '../../utils/enum';
import { mq } from '../../utils/functions';

export const StyledHeadingOne = styled.h1<{
	textColor?: ETextColor;
	singleLine?: boolean;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	opacityReduced?: boolean;
	as?: ETextType;
}>`
	font-size: 4rem;
	line-height: ${(p) => (p.singleLine ? `1` : `4.68rem`)};
	white-space: ${(p) => (p.singleLine ? `nowrap` : `unset`)};
	font-weight: normal;
	letter-spacing: -0.02em;
	text-align: ${(p) => p.textAlign};
	${(p) =>
		p.textColor === ETextColor.green
			? `color: ${p.theme.colors.text.positive};`
			: p.textColor === ETextColor.red
			? `color: ${p.theme.colors.text.negative};`
			: ''}

	${mq(
		EMediaQuery.sm,
		`font-size: 2.25rem;
		line-height: 2.93rem;`
	)}
	${(p) => (p.weight ? `font-weight: ${p.weight} !important;` : '')}

	opacity: ${(p) => (p.opacityReduced ? `0.7` : `1.0`)};
`;

export const StyledHeadingTwo = styled.h2<{
	textColor?: ETextColor;
	singleLine?: boolean;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	opacityReduced?: boolean;
	as?: ETextType;
}>`
	font-size: 3rem;
	line-height: ${(p) => (p.singleLine ? `1` : `3.875rem`)};
	white-space: ${(p) => (p.singleLine ? `nowrap` : `unset`)};
	font-weight: normal;
	letter-spacing: -0.02em;
	text-align: ${(p) => p.textAlign};
	${(p) =>
		p.textColor === ETextColor.green
			? `color: ${p.theme.colors.text.positive};`
			: p.textColor === ETextColor.red
			? `color: ${p.theme.colors.text.negative};`
			: ''}
	${mq(
		EMediaQuery.sm,
		`font-size: 2.25rem;
		line-height: 2.93rem;`
	)}
	${(p) => (p.weight ? `font-weight: ${p.weight} !important;` : '')}

	opacity: ${(p) => (p.opacityReduced ? `0.7` : `1.0`)};
`;

export const StyledHeadingThree = styled.h3<{
	textColor?: ETextColor;
	singleLine?: boolean;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	opacityReduced?: boolean;
	as?: ETextType;
}>`
	font-size: 2.25rem;
	line-height: ${(p) => (p.singleLine ? `1` : `2.625rem`)};
	white-space: ${(p) => (p.singleLine ? `nowrap` : `unset`)};
	font-weight: normal;
	letter-spacing: -0.02em;
	text-align: ${(p) => p.textAlign};
	${(p) =>
		p.textColor === ETextColor.green
			? `color: ${p.theme.colors.text.positive};`
			: p.textColor === ETextColor.red
			? `color: ${p.theme.colors.text.negative};`
			: ''}
	${mq(
		EMediaQuery.sm,
		`font-size: 1.5rem;
		line-height: 1.93rem;`
	)}
	${(p) => (p.weight ? `font-weight: ${p.weight} !important;` : '')}

	opacity: ${(p) => (p.opacityReduced ? `0.7` : `1.0`)};
`;

export const StyledHeadingFour = styled.h4<{
	textColor?: ETextColor;
	singleLine?: boolean;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	opacityReduced?: boolean;
	as?: ETextType;
}>`
	font-size: 1.5rem;
	line-height: ${(p) => (p.singleLine ? `1` : `1.93rem`)};
	white-space: ${(p) => (p.singleLine ? `nowrap` : `unset`)};
	font-weight: normal;
	letter-spacing: -0.02em;
	text-align: ${(p) => p.textAlign};
	${(p) =>
		p.textColor === ETextColor.green
			? `color: ${p.theme.colors.text.positive};`
			: p.textColor === ETextColor.red
			? `color: ${p.theme.colors.text.negative};`
			: ''}
	${mq(
		EMediaQuery.sm,
		`font-size: 1.25rem;
		line-height: 1.625rem;`
	)}
	${(p) => (p.weight ? `font-weight: ${p.weight} !important;` : '')}

	opacity: ${(p) => (p.opacityReduced ? `0.7` : `1.0`)};
`;
