import styled from 'styled-components';
import Flex from '../../../styles/layout/Flex';
import { EMediaQuery } from '../../../styles/theme/utils/enum';
import { mq } from '../../../styles/theme/utils/functions';

export const FlexEx = styled(Flex)`
	width: 150px;

	${mq(
		EMediaQuery.sm,
		`
		width: 140px;
	`
	)}
`;
