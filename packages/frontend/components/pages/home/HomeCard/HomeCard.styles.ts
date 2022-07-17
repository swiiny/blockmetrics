import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledHomeCard = styled.li`
	${(p) => css`
		position: relative;

		width: 32%;
		height: auto;

		border-radius: 30px;

		padding: ${p.theme.spacing.m};

		${mq(
			EMediaQuery.lg,
			`
			width: 48%;

			margin-top: ${p.theme.spacing.m};

			padding: ${p.theme.spacing.s};

			height: auto;
		`
		)}

		${mq(
			EMediaQuery.md,
			`
			width: 100%;
			//height: 300px;
		`
		)}

		${mq(
			EMediaQuery.sm,
			`
			&:nth-child(1) {
				margin-top: 0;
			}

		`
		)}

		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			border-radius: 30px;

			background: linear-gradient(142.69deg, ${p.theme.colors.bg} 4.17%, ${p.theme.colors.bg} 98.61%);
			opacity: 0.5;
			box-shadow: inset 0px 12px 24px #00000030;

			border: 2px solid ${p.theme.colors.deepBlue}20;

			background-clip: content-box;
		}
	`}
`;

export const StyledIconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 115px;
	width: 76px;

	border-radius: 20px;

	background-color: #ffffff10;

	${mq(
		EMediaQuery.md,
		`
			height: 60px;
			width: 60px;
			border-radius: 30px;
		`
	)}
`;

export const StyledIcon = styled.img`
	width: 42px;
	height: 42px;
`;
