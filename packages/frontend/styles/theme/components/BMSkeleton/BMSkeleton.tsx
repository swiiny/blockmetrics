import React, { FC } from 'react';
import { ESize } from '../../utils/enum';
import { StyledBMSkeleton } from './BMSkeleton.styles';
import { IBMSkeleton } from './BMSkeleton.type';

const BMSkeleton: FC<IBMSkeleton> = ({ width = 60, height = ESize.s, circle = false, ...otherProps }) => {
	return <StyledBMSkeleton width={width} height={height} circle={circle} {...otherProps} />;
};

export { BMSkeleton };
