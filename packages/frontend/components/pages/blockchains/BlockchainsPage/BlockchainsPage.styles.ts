import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledBlockchainList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;

	width: 100%;

	margin-top: -${(p) => p.theme.spacing.xl};

	gap: 21px;

	& > li {
		width: calc(((1 / 3) * 100%) - 14px);

		${mq(
			EMediaQuery.xl,
			css`
				width: calc(((1 / 2) * 100%) - 14px);
			`
		)}

		${mq(
			EMediaQuery.md,
			css`
				width: 100%;
			`
		)}
	}
`;
