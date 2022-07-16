import styled, { css } from 'styled-components';
import { EDirection, EMediaQuery, ESize } from '../../utils/enum';
import { getSpacingFromESize, mq } from '../../utils/functions';
import { IBMGradientSeparator } from './BMGradientSeparator.type';

export const StyledBMGradientSeparator = styled.span<IBMGradientSeparator>`
	${({ direction, margin, smMargin, mdMargin, lgMargin, xlMargin, theme }) => css`
		position: relative;
		z-index: 10;

		display: block;

		margin: ${getSpacingFromESize(margin || ESize.xs, theme)};

		${xlMargin ? mq(EMediaQuery.xl, `margin: ${getSpacingFromESize(xlMargin, theme)};`) : ''}
		${lgMargin ? mq(EMediaQuery.lg, `margin: ${getSpacingFromESize(lgMargin, theme)};`) : ''}
		${mdMargin ? mq(EMediaQuery.md, `margin: ${getSpacingFromESize(mdMargin, theme)};`) : ''}
		${smMargin ? mq(EMediaQuery.sm, `margin: ${getSpacingFromESize(smMargin, theme)};`) : ''}

		${direction === EDirection.vertical
			? css`
					width: 1px;
					height: 100%;
					margin-top: 0;
					margin-bottom: 0;
			  `
			: css`
					height: 1px;
					width: 100%;
					margin-left: 0;
					margin-right: 0;
			  `}

	background: ${`
		radial-gradient(${theme.colors.lightBlue + '40'}, ${theme.colors.lightBlue + '00'});
		`};
	`}
`;
