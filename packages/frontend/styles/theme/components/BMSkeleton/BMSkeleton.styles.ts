import styled, { css } from 'styled-components';
import { ESize } from '../../utils/enum';
import { getSpacingFromESize } from '../../utils/functions';
import { IBMSkeleton } from './BMSkeleton.type';

export const StyledBMSkeleton = styled.div<IBMSkeleton>`
	${({ width, height, circle, theme }) => {
		const isHeightESize = typeof height === 'string' && !height.includes('%') && !height.includes('px');
		const isWidthESize = typeof width === 'string' && !width.includes('%') && !width.includes('px');

		return css`
			position: relative;
			border-radius: 6px;
			overflow: hidden;
			background-color: ${theme.colors.deepBlue + '10'};

			width: ${typeof width === 'number'
				? `${width}px`
				: isWidthESize
				? getSpacingFromESize(width as ESize, theme)
				: width};

			${circle
				? css`
						border-radius: 50%;

						height: ${typeof width === 'number'
							? `${width}px`
							: isWidthESize
							? getSpacingFromESize(width as ESize, theme)
							: width};
				  `
				: css`
						height: ${typeof height === 'number'
							? `${height}px`
							: isHeightESize
							? getSpacingFromESize(height as ESize, theme)
							: height};
				  `}

			@keyframes skeletonWave {
				from {
					transform: translateX(-100%);
				}
				to {
					transform: translateX(100%);
				}
			}

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;

				background: linear-gradient(
					to right,
					${theme.colors.deepBlue + '00'} 20%,
					${theme.colors.deepBlue + '20'} 50%,
					${theme.colors.deepBlue + '00'} 80%
				);

				//background-size: 200% 100%;
				//background-width: 300%;

				animation: skeletonWave 1.5s ease-in-out both infinite;
			}
		`;
	}}
`;
