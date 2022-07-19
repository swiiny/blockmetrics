import React, { FC } from 'react';
import { ESize } from '../../utils/enum';
import { StyledBlockImage, StyledBlockPattern } from './BMBlockPattern.styles';
import { IBMBlockPattern } from './BMBlockPattern.type';

const BMBlockPattern: FC<IBMBlockPattern> = ({ size = ESize.l, ...otherProps }) => {
	return (
		<StyledBlockPattern size={size} {...otherProps}>
			<StyledBlockImage src='/assets/images/pattern-2.svg' alt='' draggable={false} />
		</StyledBlockPattern>
	);
};

export { BMBlockPattern };
