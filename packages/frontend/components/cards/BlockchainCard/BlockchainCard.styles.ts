import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../styles/theme/utils/enum';
import { mq } from '../../../styles/theme/utils/functions';

export const StyledBlockchainCard = styled.li<{ gradientStart?: string; gradientEnd?: string; emptyItem?: boolean }>`
	position: relative;

	overflow: hidden;

	width: 22%;
	min-height: 200px;

	border-radius: ${(p) => p.theme.radius.l};

	margin-top: ${(p) => p.theme.spacing.xl};
	padding: ${(p) => p.theme.spacing['3xs']};

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
