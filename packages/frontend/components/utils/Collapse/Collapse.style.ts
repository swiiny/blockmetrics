import styled from 'styled-components';
import { addTransition } from '../../../styles/theme/utils/functions';

export const StyledCollapse = styled.div<{ height?: number }>`
	overflow: hidden;

	${addTransition()}

	${(p) => `
      height: ${p.height + 'px'};

      opacity: ${p.height === 0 ? `0` : `1`};
  `};
`;
