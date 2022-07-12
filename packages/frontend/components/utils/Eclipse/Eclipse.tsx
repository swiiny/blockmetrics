import React, { FC } from 'react';
import { EPosition, ESize } from '../../../styles/theme/utils/enum';
import { StyledEclipse } from './Eclipse.styles';
import { IEclipse } from './Eclipse.type';

// light eclipse used as background light
const Eclipse: FC<IEclipse> = ({ size = ESize.l, position = EPosition.center, zIndex = -2, ...otherProps }) => {
	return <StyledEclipse size={size} position={position} zIndex={zIndex} {...otherProps} />;
};

export { Eclipse };
