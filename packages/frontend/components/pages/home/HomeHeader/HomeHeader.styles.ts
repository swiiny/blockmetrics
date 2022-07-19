import styled, { css } from 'styled-components';
import BMBlockPattern from '../../../../styles/theme/components/BMBlockPattern';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledHomeHeader = styled.header`
	position: relative;
	min-height: 50vh;

	display: flex;

	align-items: center;

	${mq(
		EMediaQuery.md,
		`
	align-items: flex-start;
	min-height: unset;

	padding-bottom: 80px;
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
`;

export const BMBlockPatternEx = styled(BMBlockPattern)`
	${(p) => css`
		right: -${p.theme.spacing['7xl']};

		${mq(
			EMediaQuery.xl,
			`
        right: -${p.theme.spacing['8xl']};
      `,
			'min'
		)}
	`}
`;
