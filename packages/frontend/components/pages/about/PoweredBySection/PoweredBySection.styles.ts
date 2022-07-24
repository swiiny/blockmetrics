import styled from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledPoweredBySection = styled.section`
	width: 100%;
`;

export const StyledList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;

	gap: 50px;

	${mq(
		EMediaQuery.md,
		`
		flex-direction: column;
		align-items: center;
	`
	)}
`;

export const StyledImageContainer = styled.div`
	position: relative;
	height: 60px;
	width: 200px;
	overflow: hidden;

	max-width: 100%;
`;
