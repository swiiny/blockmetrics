import React from 'react';
import { EFlex } from '../../theme/utils/enum';
import { StyledFlex } from './Flex.styles';
import { IFlex } from './Flex.type';

const Flex: React.FC<IFlex> = ({
	children,
	fullWidth = false,
	fullHeight = false,
	wrapItems = false,
	padding,
	paddingBottom,
	paddingTop,
	paddingLeft,
	paddingRight,
	paddingX,
	paddingY,
	direction = EFlex.row,
	horizontal = EFlex.start,
	vertical = EFlex.start,
	smDirection,
	mdDirection,
	lgDirection,
	xlDirection,
	smHorizontal,
	mdHorizontal,
	lgHorizontal,
	xlHorizontal,
	smVertical,
	mdVertical,
	lgVertical,
	xlVertical,
	...otherProps
}) => {
	return (
		<StyledFlex
			direction={direction}
			fullWidth={fullWidth}
			fullHeight={fullHeight}
			wrapItems={wrapItems}
			padding={padding}
			paddingX={paddingX}
			paddingY={paddingY}
			paddingBottom={paddingBottom}
			paddingTop={paddingTop}
			paddingLeft={paddingLeft}
			paddingRight={paddingRight}
			horizontal={horizontal}
			vertical={vertical}
			smDirection={smDirection}
			mdDirection={mdDirection}
			lgDirection={lgDirection}
			xlDirection={xlDirection}
			smHorizontal={smHorizontal}
			mdHorizontal={mdHorizontal}
			lgHorizontal={lgHorizontal}
			xlHorizontal={xlHorizontal}
			smVertical={smVertical}
			mdVertical={mdVertical}
			lgVertical={lgVertical}
			xlVertical={xlVertical}
			{...otherProps}
		>
			{children}
		</StyledFlex>
	);
};

export { Flex };
