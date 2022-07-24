import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { addMarginStyles, mq } from '../../../../styles/theme/utils/functions';
import { IMargin } from '../../../../types/layouts';

export const StyledList = styled.ul<IMargin>`
	width: 100%;

	${(p) => addMarginStyles(p)}
`;

export const StyledUsefulLinkList = styled.ul`
	width: 100%;
	list-style: inside;

	padding-left: 12px;
`;

export const StyledRank = styled.div`
	${(p) => css`
		position: absolute;
		top: 0;
		right: 0%;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 130px;
		height: 120px;

		border-bottom-left-radius: 20px;

		&::before {
			content: ' ';
			position: absolute;
			top: 2px;
			left: 0;
			right: 2px;
			bottom: 0;
			z-index: -1;
			border-bottom-left-radius: 10px;
			border-top-right-radius: 28px;
			background: ${p.theme.colors.gradient.toBottom};
			opacity: 0.15;

			box-shadow: 0px 10px 20px rgba(69, 189, 230, 0.15), inset 0px 4px 7px rgba(36, 94, 114, 0.44);
		}

		${mq(
			EMediaQuery.lg,
			css`
				position: relative;

				width: 100px;
				height: 100px;

				border-radius: 50%;

				margin-left: 20px;

				flex-shrink: 0;

				&::before {
					border-radius: 50%;

					top: 0px;
					right: 0px;
				}
			`
		)}

		${mq(
			EMediaQuery.md,
			css`
				width: 80px;
				height: 80px;
			`
		)}
	`}
`;
