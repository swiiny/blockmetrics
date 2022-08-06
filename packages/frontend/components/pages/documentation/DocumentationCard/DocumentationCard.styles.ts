import styled from 'styled-components';
import { addMarginStyles } from '../../../../styles/theme/utils/functions';
import { IMargin } from '../../../../types/layouts';

export const StyledList = styled.ul<IMargin>`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	width: 100%;

	max-height: 500px;

	${(p) => addMarginStyles(p)}

	& > li {
		width: 45%;
	}
`;

export const StyledSubitemsList = styled.ul`
	width: calc(100% - 12px);

	list-style: inside;
	list-style-position: outside;

	margin-left: 12px;
	margin-top: 5px;

	& > li {
		margin-bottom: 5px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;
