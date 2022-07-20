import styled from 'styled-components';
import { BMCardContainer } from '../../../../styles/theme/components/BMCardContainer';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledImageContainer = styled.div`
	position: relative;
	width: 220px;
	height: 220px;
	border-radius: 20px;
	overflow: hidden;

	${mq(
		EMediaQuery.md,
		`
    width: 120px;
		height: 120px;
		max-width: 100%;

		border-radius: 100%;
    `
	)}

	${mq(
		EMediaQuery.md,
		`
    width: 80px;
		height: 80px;
    `
	)}
`;

export const BMCardContainerEx = styled(BMCardContainer)`
	width: 100%;
`;

export const StyledTextContainer = styled.div`
	max-width: calc(100% - 250px);

	${mq(
		EMediaQuery.md,
		`
		width: 100%;
		max-width: unset;
	`
	)}
`;

export const StyledCitationContainer = styled.div`
	position: absolute;
	right: -15px;
	top: -15px;

	${mq(
		EMediaQuery.md,
		`
		top: -25px;
		right: -25px;
    transform: scale(0.5);
    `
	)}
`;
