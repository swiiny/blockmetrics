import React from 'react';
import { ESize } from '../../theme/utils/enum';
import { StyledSpacing } from './Spacing.styles';
import { ISpacing } from './Spacing.type';

const Spacing: FC<ISpacing> = ({
	size = ESize.l,
	smSize,
	mdSize,
	lgSize,
	xlSize,
	xsDirection,
	smDirection,
	mdDirection,
	lgDirection,
	xlDirection,
	...otherProps
}) => {
	return (
		<StyledSpacing
			size={size}
			smSize={smSize}
			mdSize={mdSize}
			lgSize={lgSize}
			xlSize={xlSize}
			xsDirection={xsDirection}
			smDirection={smDirection}
			mdDirection={mdDirection}
			lgDirection={lgDirection}
			xlDirection={xlDirection}
			{...otherProps}
		/>
	);
};

export { Spacing };
