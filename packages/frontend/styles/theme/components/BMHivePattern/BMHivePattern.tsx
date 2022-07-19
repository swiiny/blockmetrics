import React, { FC } from 'react';
import { ESize } from '../../utils/enum';
import { StyledHiveImage, StyledHivePattern } from './BMHivePattern.styles';
import { IBMHivePattern } from './BMHivePattern.type';

const BMHivePattern: FC<IBMHivePattern> = ({ size = ESize.l }) => {
	return (
		<StyledHivePattern size={size}>
			<StyledHiveImage src='/assets/images/pattern-1.svg' alt='' draggable={false} />
		</StyledHivePattern>
	);
};

export { BMHivePattern };
