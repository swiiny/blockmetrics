import styled from 'styled-components';

export const StyledBlockchainList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;

	width: 100%;

	margin-top: -${(p) => p.theme.spacing.xl};

	& > li {
		width: 32%;
		height: auto;
	}
`;
