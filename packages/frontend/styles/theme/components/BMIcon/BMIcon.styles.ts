import styled, { css } from 'styled-components';
import { ESize } from '../../utils/enum';
import { addTransition } from '../../utils/functions';
import { IBMIcon } from './BMIcon.type';

export const StyledIcon = styled.span<IBMIcon>`
	${(p) => css`
		position: relative;

		display: flex;
		justify-content: center;
		align-items: center;

		${addTransition()}

		${() => {
			if (!p.size) {
				return '';
			}

			switch (p.size) {
				case ESize.s:
					return `
					width: 35px;
					height: 35px;
        `;
				case ESize.m:
					return `
					width: 50px;
					height: 50px;
        `;
				case ESize.l:
					return `
					width: 70px;
					height: 70px;
        `;
				case ESize.xl:
					return `
					width: 90px;
					height: 90px;
        `;
				default:
					return ``;
			}
		}}
	`}
`;

export const StyledBackground = styled.span<{ backgroundVisible?: boolean }>`
	${(p) => css`
		display: flex;
		justify-content: center;
		align-items: center;

		${p.backgroundVisible
			? `
				border-radius: 20px;
				padding: ${p.theme.spacing.m};

				background-color: ${p.theme.colors.text.default + '10'};
			`
			: `	`}
	`}
`;
