import styled from 'styled-components';
import { EMediaQuery } from '../../styles/theme/utils/enum';
import { mq } from '../../styles/theme/utils/functions';

export const StyledHeader = styled.header`
	margin-top: 160px;

	max-width: 650px;
`;

export const StyledImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: auto;
	height: 70px;

	overflow: hidden;

	${mq(EMediaQuery.sm, `height: 50px;`)}

	img {
		width: auto;
		height: 100%;
	}
`;
