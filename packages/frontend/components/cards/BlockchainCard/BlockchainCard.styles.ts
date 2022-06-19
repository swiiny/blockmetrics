import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../styles/theme/utils/enum';
import { mq } from '../../../styles/theme/utils/functions';

export const StyledBlockchainCard = styled.li<{ gradientStart?: string; gradientEnd?: string; emptyItem?: boolean }>`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	overflow: hidden;

	width: 22%;
	min-height: 200px;

	align-self: stretch;

	border-radius: ${(p) => p.theme.radius.l};

	margin-top: ${(p) => p.theme.spacing.xl};
	padding: ${(p) => p.theme.spacing['3xs']};

	& > a {
		margin-top: auto;
	}

	${(p) =>
		!p.emptyItem
			? css`
					background: linear-gradient(to bottom, ${p.gradientStart}, ${p.gradientEnd});
					border: 2px solid ${p.gradientStart};
			  `
			: ''}

	${mq(EMediaQuery.lg, `width: 30%;`)}
	${mq(EMediaQuery.md, `width: 45%;`)}
	${mq(EMediaQuery.sm, `width: 100%;`)}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	animation: fadeIn 0.5s ease-in-out;
`;

export const StylesCardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin: -${(p) => p.theme.spacing['3xs']};

	& > h4 {
		padding-left: ${(p) => p.theme.spacing['3xs']};
	}
`;

export const StyledLogoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(p) => p.theme.colors.text.default};

	border-bottom-left-radius: ${(p) => p.theme.radius.l};

	width: 50px;
	height: 50px;

	& > div {
		position: relative;

		width: 70%;
		height: 70%;
	}
`;

export const StyledExtendedLink = styled.span`
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;
