import styled, { css } from 'styled-components';
import { EMediaQuery, ESize } from '../../utils/enum';
import { mq } from '../../utils/functions';
import { IBMBlockPattern } from './BMBlockPattern.type';

export const StyledBlockPattern = styled.div<IBMBlockPattern>`
	${(p) => css`
		position: absolute;

		right: -${p.theme.spacing['4xl']};
		top: -20px;
		bottom: 10px;

		width: 100%;

		display: flex;
		justify-content: flex-end;

		${() => {
			switch (p.size) {
				case ESize.s:
					return `
					height: 250px;
					top: calc(50% - 175px);
					bottom: unset;
					`;
				default:
					break;
			}
		}}

		${mq(EMediaQuery.md, `display: none;`)}
	`}
`;

export const StyledBlockImage = styled.img`
	width: auto;
	height: 100%;
`;
