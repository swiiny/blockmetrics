import React from 'react';
import { ETextType, ETextAlign, ETextColor } from '../../utils/enum';
import { IBMText } from '../BMText/BMText.type';
import { StyledHeadingFour, StyledHeadingOne, StyledHeadingThree, StyledHeadingTwo } from './BMHeading.styles';

const BMHeading: React.FC<IBMText> = ({
	className = '',
	singleLine = true,
	style,
	children,
	weight,
	type,
	textColor = ETextColor.default,
	textAlign = ETextAlign.left,
	opacityReduced = false,
	as,
	...otherProps
}) => {
	switch (type) {
		case ETextType.h1:
			return (
				<StyledHeadingOne
					className={className}
					singleLine={singleLine}
					style={style}
					textAlign={textAlign}
					textColor={textColor}
					weight={weight}
					opacityReduced={opacityReduced}
					as={as}
					{...otherProps}
				>
					{children}
				</StyledHeadingOne>
			);
		case ETextType.h2:
			return (
				<StyledHeadingTwo
					className={className}
					singleLine={singleLine}
					style={style}
					textAlign={textAlign}
					textColor={textColor}
					weight={weight}
					opacityReduced={opacityReduced}
					as={as}
					{...otherProps}
				>
					{children}
				</StyledHeadingTwo>
			);
		case ETextType.h3:
			return (
				<StyledHeadingThree
					className={className}
					singleLine={singleLine}
					style={style}
					textAlign={textAlign}
					textColor={textColor}
					weight={weight}
					opacityReduced={opacityReduced}
					as={as}
					{...otherProps}
				>
					{children}
				</StyledHeadingThree>
			);
		case ETextType.h4:
			return (
				<StyledHeadingFour
					className={className}
					singleLine={singleLine}
					style={style}
					textAlign={textAlign}
					textColor={textColor}
					opacityReduced={opacityReduced}
					as={as}
					{...otherProps}
				>
					{children}
				</StyledHeadingFour>
			);
		default:
			return <></>;
	}
};

export { BMHeading };
