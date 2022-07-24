import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledList = styled.ul`
	${(p) => css`
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		${mq(
			EMediaQuery.md,
			`
					flex-direction: column;
					align-items: center;
				`
		)}

		width: 100%;

		& > li {
			width: 32%;
			height: auto;

			border-radius: 30px;

			padding: ${p.theme.spacing.m};

			${mq(
				EMediaQuery.lg,
				`
			width: 48%;

			margin-top: ${p.theme.spacing.m};

			height: auto;
		`
			)}

			${mq(
				EMediaQuery.md,
				`
			width: 100%;
		`
			)}

		${mq(
				EMediaQuery.sm,
				`
				padding: ${p.theme.spacing.xs};

			&:nth-child(1) {
				margin-top: 0;
			}
		`
			)}
		}
	`}
`;
