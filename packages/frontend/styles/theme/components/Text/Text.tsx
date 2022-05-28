import React from 'react';
import { ESize, ETextAlign, ETextColor, ETextType } from '../../utils/enum';
import { StyledTextLink, StyledTextParagraph, StyledTextSpan } from './Text.styles';
import { IText } from './Text.type';

const Text: React.FC<IText> = ({
	children,
	type = ETextType.p,
	textColor = ETextColor.default,
	size = ESize.l,
	textAlign = ETextAlign.left,
	href,
	disabled = false,
	weight,
	style,
	singleLine = false,
	className = '',
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
					rel='noopener noreferrer'
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
					rel='noopener noreferrer'
					textAlign={textAlign}
					textColor={textColor}
					size={size}
					disabled={disabled}
					target={'_blank'}
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

export { Text };
