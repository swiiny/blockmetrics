import React from 'react';
import { ESize, ETextAlign, ETextColor, ETextType } from '../../utils/enum';
import { StyledTextLink, StyledTextParagraph, StyledTextSpan } from './BMText.styles';
import { IBMText } from './BMText.type';

const BMText: React.FC<IBMText> = ({
	children,
	type = ETextType.p,
	textColor = ETextColor.default,
	size = ESize.l,
	textAlign = ETextAlign.left,
	href,
	disabled = false,
	weight,
	underline = false,
	style,
	singleLine = false,
	className = '',
	inheritStyle = true,
	opacityReduced = false,
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
					underline={underline}
					textAlign={textAlign}
					textColor={textColor}
					opacityReduced={opacityReduced}
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
					underline
					href={href}
					rel='noopener noreferrer'
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					disabled={disabled}
					opacityReduced={opacityReduced}
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
					underline
					href={href}
					rel='noopener noreferrer'
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					disabled={disabled}
					target={'_blank'}
					opacityReduced={opacityReduced}
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
					underline
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					inheritStyle={inheritStyle}
					opacityReduced={opacityReduced}
					{...otherProps}
				>
					{children}
				</StyledTextSpan>
			);
		default:
			return <></>;
	}
};

export { BMText };
