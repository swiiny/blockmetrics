import React, { FC } from 'react';
import { StyledColumn } from './Column.styles';
import { IColumn } from './Column.type';

const Column: FC<IColumn> = ({ children, columns, ...otherProps }) => (
	<StyledColumn columns={columns} {...otherProps}>
		{children}
	</StyledColumn>
);

export { Column };
