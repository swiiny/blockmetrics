import React, { FC } from 'react';
import { EFlex } from '../../theme/utils/enum';
import { StyledFlex } from './Flex.styles';
import { IFlex } from './Flex.type';

const Flex: FC<IFlex> = ({
	children,
	fullWidth = false,
	fullHeight = false,
	wrapItems = false,
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
