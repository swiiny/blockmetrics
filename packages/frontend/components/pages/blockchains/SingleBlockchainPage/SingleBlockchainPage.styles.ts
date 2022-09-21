import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { addMarginStyles, addPaddingStyles, mq } from '../../../../styles/theme/utils/functions';
import { IMargin } from '../../../../types/global';

export const StyledList = styled.ul`
	${(p) => css`
		display: flex;
		justify-content: space-between;

		flex-wrap: wrap;

		margin: ${p.theme.spacing['3xl']} 0;
		width: 100%;

		${addPaddingStyles(p)}

		& > li {
			width: calc(25% - 20px);
		}

		${mq(
			EMediaQuery.lg,
			css`
				gap: 30px;

				& > li {
					width: calc(50% - 15px);
				}
			`
		)}

		${mq(
			EMediaQuery.sm,
			css`
				gap: 20px;

				& > li {
					width: calc(50% - 10px);
				}
			`
		)}

		${mq(
			EMediaQuery.ssm,
			css`
				gap: 20px;

				& > li {
					width: 100%;
				}
			`
		)}
	`}
`;
