import styled, { css } from 'styled-components';
import { addTransition } from '../../../../styles/theme/utils/functions';

export const StyledListItem = styled.li<{ isVisible?: boolean }>`
	${(p) => css`
		position: relative;
		width: 100%;

		${addTransition()}
		${p.isVisible
			? css`
					max-height: 200px;
					opacity: 1;
			  `
			: css`
					max-height: 0px;
					opacity: 0;
			  `}
	`}
`;
