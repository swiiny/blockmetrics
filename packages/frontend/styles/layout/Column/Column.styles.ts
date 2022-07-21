import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../theme/utils/enum';
import { addPaddingStyles, mq } from '../../theme/utils/functions';
import { IColumn } from './Column.type';

function width(factor: number) {
	return `${(factor / 12) * 100}%`;
}

export const StyledColumn = styled.div<IColumn>`
	position: relative;
	width: 100%;

	${(p) =>
		p.fullHeight
			? css`
					align-self: stretch;
			  `
			: ``}

	${({ columns, sm, md, lg, xl }) => css`
		${columns ? `width: ${width(columns)};` : ''}
		${columns === 0 ? `display: none` : ''}

		${xl ? mq(EMediaQuery.xl, `width: ${width(xl)};`) : ''}
		${lg ? mq(EMediaQuery.lg, `width: ${width(lg)};`) : ''}
		${md ? mq(EMediaQuery.md, `width: ${width(md)};`) : ''}
		${sm ? mq(EMediaQuery.sm, `width: ${width(sm)};`) : ''}
    
		${xl === 0 ? mq(EMediaQuery.xl, `display: none`) : ''}
		${lg === 0 ? mq(EMediaQuery.lg, `display: none`) : ''}
		${md === 0 ? mq(EMediaQuery.md, `display: none`) : ''}
		${sm === 0 ? mq(EMediaQuery.sm, `display: none`) : ''}
	`}

	${(p) => addPaddingStyles(p)}
`;
