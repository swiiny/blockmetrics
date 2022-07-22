import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../styles/theme/utils/enum';
import { mq } from '../../styles/theme/utils/functions';

export const StyledHeader = styled.header`
	position: relative;
	margin-top: 180px;
	padding-bottom: 90px;

	${mq(
		EMediaQuery.md,
		`
	margin-top: 150px;
	padding-bottom: 75px;
	`
	)}

	${(p) => css`
		&:before {
			content: ' ';
			position: absolute;
			top: -240px;
			left: -${p.theme.spacing['4xl']};
			right: -${p.theme.spacing['4xl']};
			bottom: 0;

			background: linear-gradient(105.2deg, ${p.theme.colors.bg} 0.31%, #161b21 100%);

			${mq(
				EMediaQuery.xl,
				`
        left: -100vw;
        right: -100vw;
      `,
				'min'
			)}

			${mq(
				EMediaQuery.sm,
				`
				left: -15px;
        right: -15px;
			`
			)}
		}
	`}

	& > div > p {
		max-width: 650px;
		min-height: 48px;
	}
`;
