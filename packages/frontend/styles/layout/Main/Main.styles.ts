import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../theme/utils/enum';
import { mq } from '../../theme/utils/functions';

const Main = styled.main`
	margin: 0 auto;
	max-width: 1600px;
	padding: 0 ${(p) => p.theme.spacing['2xl']};

	${mq(EMediaQuery.sm, `padding: 0 15px;`)}
`;

export { Main };
