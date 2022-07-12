import styled, { css } from 'styled-components';

export const StyledHomeCard = styled.li`
	${(p) => css`
		position: relative;

		width: 32%;
		height: 440px;

		border-radius: 30px;

		padding: ${p.theme.spacing.s};

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
`;

export const StyledIcon = styled.img`
	width: 42px;
	height: 42px;
`;
