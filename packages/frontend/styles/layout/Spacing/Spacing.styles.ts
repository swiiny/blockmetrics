import React from 'react';
import styled, { css } from 'styled-components';
import { EDirection, EMediaQuery, ESize } from '../../theme/utils/enum';
import { mq } from '../../theme/utils/functions';
import { ISpacing } from './Spacing.type';

const setRect = (spacing: string, direction: EDirection, index: EMediaQuery) => {
	return mq(
		index,
		css`
			${direction === EDirection.vertical ? `margin: ${spacing} 0;` : direction === EDirection.horizontal ? `margin: 0 ${spacing};` : ''}
		`
	);
};

export const StyledSpacing = styled.span<ISpacing>`
	display: inline-block;

	${({ size, xs, sm, md, lg, xl, theme }) => {
		const spacing = theme.spacing[size];
		return css`
			height: 0;
			width: 0;

			margin: ${spacing};

			${xs === EDirection.vertical ? `margin: ${spacing} 0;` : xs === EDirection.horizontal ? `margin: 0 ${spacing};` : ''}

			${sm ? setRect(spacing, sm, EMediaQuery.sm) : ''}
      ${md ? setRect(spacing, md, EMediaQuery.md) : ''}
      ${lg ? setRect(spacing, lg, EMediaQuery.lg) : ''}
      ${xl ? setRect(spacing, xl, EMediaQuery.xl) : ''}

      margin-left: 0;
			margin-bottom: 0;
		`;
	}}
`;
