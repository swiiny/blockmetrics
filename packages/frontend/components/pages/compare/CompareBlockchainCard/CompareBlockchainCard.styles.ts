import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledRank = styled.div`
	${(p) => css`
		position: absolute;
		top: 0;
		right: 0%;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 60px;
		height: 50px;

		border-top-right-radius: 30px;
		border-bottom-left-radius: 10px;

		overflow: hidden;

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
			EMediaQuery.md,
			css`
				width: 60px;
				height: 50px;
			`
		)}
	`}
`;
