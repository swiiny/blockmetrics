
import React from "react";
import styled, { css } from "styled-components";
import { ESize, ETextAlign, ETextColor, ETextType, ETextWeight } from "../../utils/enum";
import { addTransition, setFontSize } from "../../utils/functions";

interface IText {
	children: React.ReactNode | string;
	type?: ETextType;
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: ETextAlign;
	href?: string;
	disabled?: boolean;
	isExternal?: boolean;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
	className?: string;
	inheritStyle?: boolean;
}

const generateTextStyle = (p: any) => {
	return css`
		${setFontSize(p.size)}
		font-weight: normal;
		letter-spacing: -0.02em;
		${addTransition()}
		text-align: ${p.textAlign};
		${p.singleLine ? "line-height: 1rem;" : ""}
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
	${p.textColor === ETextColor.green ? `color: ${p.theme.colors.accent};` : p.textColor === ETextColor.red ? `color: ${p.theme.colors.negative};` : ""}
	${p.weight ? `font-weight: ${p.weight} !important;` : ""}
	`;
};

const StyledTextParagraph = styled.p<{
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
}>`
	${(p) => generateTextStyle(p)}
`;

const StyledTextLink = styled.a<{
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: string;
	disabled?: boolean;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
}>`
	${(p) => generateTextStyle(p)}
	text-decoration: underline dotted;
	text-decoration-thickness: 1px;
	text-underline-offset: 1ex;
	text-decoration-color: ${(p) => p.theme.colors.typo + "30"};
	${(p) =>
		p.disabled
			? css`
					opacity: 0.3;
					cursor: default;
			  `
			: css`
					&:hover {
						color: ${p.theme.colors.accent};
						text-decoration-color: ${p.theme.colors.accent + "30"};
					}
			  `}
`;

const StyledTextSpan = styled.span<{
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: string;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
	inheritStyle?: boolean;
}>`
	${(p) => generateTextStyle(p)}
`;

const OText: React.FC<IText> = ({
	children,
	type = ETextType.p,
	textColor = ETextColor.normal,
	size = ESize.l,
	textAlign = ETextAlign.left,
	href,
	disabled = false,
	weight,
	style,
	singleLine = false,
	className = "",
	inheritStyle = true,
	...otherProps
}) => {
	switch (type) {
		case ETextType.p:
			return (
				<StyledTextParagraph
					className={className}
					singleLine={singleLine}
					style={style}
					weight={weight}
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					{...otherProps}
				>
					{children}
				</StyledTextParagraph>
			);
		case ETextType.link:
			return (
				<StyledTextLink
					className={className}
					singleLine={singleLine}
					style={style}
					weight={weight}
					href={href}
					rel="noopener noreferrer"
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					disabled={disabled}
					{...otherProps}
				>
					{children}
				</StyledTextLink>
			);
		case ETextType.externalLink:
			return (
				<StyledTextLink
					className={className}
					singleLine={singleLine}
					style={style}
					weight={weight}
					href={href}
					rel="noopener noreferrer"
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					disabled={disabled}
					target={"_blank"}
					{...otherProps}
				>
					{children}
				</StyledTextLink>
			);
		case ETextType.span:
			return (
				<StyledTextSpan
					className={className}
					singleLine={singleLine}
					style={style}
					weight={weight}
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					inheritStyle={inheritStyle}
					{...otherProps}
				>
					{children}
				</StyledTextSpan>
			);
		default:
			return <></>;
	}
};

export { IText, OText };
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete