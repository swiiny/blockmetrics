import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../utils/enum';
import { mq } from '../../utils/functions';
import { IBMHivePattern } from './BMHivePattern.type';

// @todo(add size to the pattern)
export const StyledHivePattern = styled.div<IBMHivePattern>`
	${(p) => css`
		position: absolute;

		right: -${p.theme.spacing['4xl']};
		top: -240px;
		bottom: 0;

		width: 100%;

		display: flex;
		justify-content: flex-end;

		${mq(EMediaQuery.md, `right: 0;`)}
	`}
`;

export const StyledHiveImage = styled.img`
	width: auto;
	height: 100%;
`;
