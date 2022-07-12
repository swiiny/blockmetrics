import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../styles/theme/utils/enum';
import { mq } from '../../styles/theme/utils/functions';

export const StyledNavbar = styled.nav<{ isHidden?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: fixed;
	top: 0;
	left: 0;
	width: 100%;

	z-index: 100;

	padding: 0 ${(p) => p.theme.spacing['4xl']};

	${mq(EMediaQuery.sm, `padding: 0 15px;`)}

	height: 120px;

	${(p) => (p.isHidden ? `display: none;` : '')}
`;

export const StyledList = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const StyledNavbarItem = styled.li`
	& > a {
		display: inline-block;
		margin: 0 ${(p) => p.theme.spacing.s};
		padding: ${(p) => p.theme.spacing.s} 0;
	}

	&:nth-child(1) a {
		margin-left: 0;
	}

	&:nth-last-child(1) a {
		margin-right: 0;
	}
`;
