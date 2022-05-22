import React from 'react';
import { ESize } from '../../theme/utils/enum';
import { StyledSpacing } from './Spacing.styles';
import { ISpacing } from './Spacing.type';

const Spacing: React.FC<ISpacing> = ({ className = '', size = ESize.l, xs, sm, md, lg, xl, ...otherProps }) => {
	return <StyledSpacing className={className} size={size} xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...otherProps} />;
};

export { Spacing };
