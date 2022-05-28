import styled from 'styled-components';
import Flex from '../../../../styles/layout/Flex';
import Text from '../../../../styles/theme/components/Text';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { mq } from '../../../../styles/theme/utils/functions';

export const StyledImageContainer = styled.div`
	position: relative;
	width: 152px;
	height: 152px;
	border-radius: 50%;
	overflow: hidden;

	${mq(
		EMediaQuery.md,
		`
    width: 100px;
	  height: 100px;
    `
	)}
`;

export const FlexEx = styled(Flex)`
	max-width: 650px;
	width: 100%;
`;

export const StyledTextContainer = styled.div`
	max-width: calc(100% - 182px);

	${mq(EMediaQuery.md, `max-width: calc(100% - 130px);`)}
`;

export const TextEx = styled(Text)`
	font-weight: 300;
	font-style: italic;
	quotes: initial;

	&::before {
		content: open-quote;
	}
	&::after {
		content: close-quote;
	}
`;
