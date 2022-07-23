import styled from 'styled-components';
import { addMarginStyles } from '../../../../styles/theme/utils/functions';
import { IMargin } from '../../../../types/layouts';

export const StyledList = styled.ul<IMargin>`
	width: 100%;

	${(p) => addMarginStyles(p)}
`;
