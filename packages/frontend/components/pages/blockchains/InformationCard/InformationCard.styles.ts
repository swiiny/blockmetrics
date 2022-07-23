import styled from 'styled-components';
import { addMarginStyles } from '../../../../styles/theme/utils/functions';
import { IMargin } from '../../../../types/layouts';

export const StyledList = styled.ul<IMargin>`
	width: 100%;

	${(p) => addMarginStyles(p)}
`;

export const StyledUsefulLinkList = styled.ul`
	width: 100%;
	list-style: inside;

	padding-left: 12px;
`;
