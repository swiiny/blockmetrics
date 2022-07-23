import styled, { css } from 'styled-components';
import { addPaddingStyles } from '../../utils/functions';

export const StyledBMListItem = styled.li`
	position: relative;

	display: flex;

	width: 100%;

	${(p) => addPaddingStyles(p)}

	& + li {
		margin-top: ${(p) => p.theme.spacing.s};
	}
`;

export const StyledDot = styled.div`
	${(p) => css`
		position: relative;

		display: block;

		flex-shrink: 0;

		top: 5px;

		width: 12px;
		height: 12px;

		border-radius: 50%;
		background: ${p.theme.colors.gradient.toBottom};

		&::before {
			content: ' ';

			position: absolute;
			top: -2px;
			left: -2px;
			right: -2px;
			bottom: -2px;

			border-radius: 50%;

			background-color: rgba(82, 187, 232, 0.1);

			box-shadow: 0px 10px 20px rgba(69, 189, 230, 0.15), inset 0px 4px 7px rgba(36, 94, 114, 0.44);
		}
	`}
`;
