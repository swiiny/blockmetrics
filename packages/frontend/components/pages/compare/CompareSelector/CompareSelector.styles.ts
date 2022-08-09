import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { addTransition, mq } from '../../../../styles/theme/utils/functions';

export const StyledSelectSquare = styled.div`
	width: 20px;
	height: 20px;

	background-color: ${(p) => p.theme.colors.darkGrey};

	border-radius: 5px;
	border: solid 1px ${(p) => p.theme.colors.primary};
`;

export const StyledSelectedCircle = styled.div<{ isSelected?: boolean }>`
	${(p) => css`
		position: absolute;

		display: flex;
		justify-content: center;
		align-items: center;

		right: -5px;
		top: -5px;

		width: 24px;
		height: 24px;

		background-color: ${p.theme.colors.darkGrey};

		border-radius: 50%;
		border: solid 1px ${p.theme.colors.primary};

		${addTransition()}

		overflow: hidden;

		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0%;

			opacity: ${p.isSelected ? 1 : 0};

			${addTransition()}

			background: ${p.theme.colors.gradient.toTop};
		}

		${p.isSelected
			? css`
					border-color: ${p.theme.colors.primary + '00'};
			  `
			: ''}
	`}
`;

export const StyledListItem = styled.li<{ isEmpty?: boolean }>`
	${(p) => css`
		position: relative;

		width: auto;
		height: auto;

		& + li {
			margin-left: 30px;
		}

		${p.isEmpty ? `height: 0; overflow: hidden;` : ''}

		${mq(
			EMediaQuery.md,
			`
				margin-left: 20px;
				margin-right: 20px;

				margin-top: ${p.theme.spacing.s};

				${p.isEmpty ? `height: 0; margin-top: 0; overflow: hidden;` : ''}
			`
		)}
		${mq(
			EMediaQuery.sm,
			`
				margin-left: 10px;
				margin-right: 10px;

				& + li {
					margin-left: 10px;
				}
			`
		)}
	`}
`;
