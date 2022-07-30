import styled, { css } from 'styled-components';
import { ESize } from '../../utils/enum';
import { addTransition, getSpacingFromESize } from '../../utils/functions';
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
				case ESize['2xs']:
					return `
					width: 15px;
					height: 15px;
        `;
				case ESize.xs:
					return `
					width: 25px;
					height: 25px;
        `;
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

export const StyledBackground = styled.span<{
	backgroundVisible?: boolean;
	backgroundRadius: ESize;
	backgroundSize: ESize;
}>`
	${(p) => css`
		display: flex;
		justify-content: center;
		align-items: center;

		${p.backgroundVisible
			? `
				padding: ${getSpacingFromESize(p.backgroundSize, p.theme)};

				background-color: ${p.theme.colors.text.default + '10'};

				border-radius: ${getSpacingFromESize(p.backgroundRadius, p.theme)};
			`
			: `	`}
	`}
`;
