import styled, { css } from 'styled-components';
import { EDirection } from '../../utils/enum';
import { IBMGradientSeparator } from './BMGradientSeparator.type';

export const StyledBMGradientSeparator = styled.span<IBMGradientSeparator>`
	${(p) => css`
		position: relative;
		z-index: 10;

		display: block;

		${p.direction === EDirection.vertical
			? css`
					width: 1px;
					height: 100%;
			  `
			: css`
					height: 1px;
					width: 100%;
			  `}

		${p.margin
			? css`
					${() => {
						switch (p.direction) {
							case EDirection.vertical:
								// @ts-ignore
								return `margin: ${p.theme.spacing[p.margin || 'xs']} 0;`;
							case EDirection.horizontal:
								// @ts-ignore
								return `margin: 0 ${p.theme.spacing[p.margin || 'xs']};`;
							default:
								// @ts-ignore
								return `margin: ${p.theme.spacing[p.margin || 'xs']} 0;`;
						}
					}}
			  `
			: ''}

	background: ${`
		radial-gradient(${p.theme.colors.lightBlue + '30'}, ${p.theme.colors.lightBlue + '00'});
		`};
	`}
`;
