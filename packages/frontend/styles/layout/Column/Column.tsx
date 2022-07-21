import React, { FC } from 'react';
import { StyledColumn } from './Column.styles';
import { IColumn } from './Column.type';

const Column: FC<IColumn> = ({ children, columns, fullHeight = false, ...otherProps }) => (
	<StyledColumn columns={columns} fullHeight={fullHeight} {...otherProps}>
		{children}
	</StyledColumn>
);

export { Column };
