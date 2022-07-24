import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

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
