import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledHomeHeader = styled.header`
	position: relative;
	min-height: 50vh;

	display: flex;

	align-items: center;

	${mq(
		EMediaQuery.sm,
		`
		align-items: flex-start;
		min-height: unset;
		
		padding-bottom: 80px;
	`
	)} {

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
		}
	`}
`;

export const StyledGradientLine = styled.div`
	width: 45%;
	height: 6px;

	border-radius: 3px;

	${(p) => css`
		background: linear-gradient(to right, ${p.theme.colors.bg} 0%, ${p.theme.colors.primary} 100%);
	`}
`;

export const StyledHivePattern = styled.div`
	${(p) => css`
		position: absolute;

		right: -${p.theme.spacing['4xl']};
		top: -240px;
		bottom: 0;

		width: 100%;

		display: flex;
		justify-content: flex-end;
	`}
`;

export const StyledHiveImage = styled.img`
	width: auto;
	height: 100%;
`;

export const StyledBlockPattern = styled.div`
	${(p) => css`
		position: absolute;

		right: -${p.theme.spacing['4xl']};
		top: -20px;
		bottom: 10px;

		width: 100%;

		display: flex;
		justify-content: flex-end;

		${mq(EMediaQuery.md, `display: none;`)}
	`}
`;
export const StyledBlockImage = styled.img`
	width: auto;
	height: 100%;
`;
