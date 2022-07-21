import styled, { css } from 'styled-components';
import { ESize } from '../../utils/enum';
import { addTransition } from '../../utils/functions';
import { IBMProgressBar } from './BMProgressBar.type';

export const StyledBMProgressBar = styled.div<IBMProgressBar>`
	${(p) => css`
		position: relative;

		width: 100%;

		background: linear-gradient(to left, #454a75 0%, #ba92b220 100%);

		overflow: hidden;

		${() => {
			switch (p.size) {
				case ESize.s:
					return `
					height: 10px;
					border-radius: 5px;
					`;
				case ESize.m:
					return `
					height: 20px;
					border-radius: 10px;
					`;
				case ESize.l:
					return `
					height: 30px;
					border-radius: 15px;
					`;
				default:
					return `
					height: 30px;
					border-radius: 15px;
					`;
			}
		}}

		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;

			width: ${p.value}%;

			background: ${p.theme.colors.gradient.toLeft};

			border-radius: inherit;

			${addTransition()}
		}
	}
	`}
`;
