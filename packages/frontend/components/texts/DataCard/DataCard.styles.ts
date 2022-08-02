import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../../styles/theme/utils/enum';
import { mq } from '../../../styles/theme/utils/functions';

export const StyledTooltip = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;

	${mq(
		EMediaQuery.sm,
		css`
			top: unset;
			right: 10px;
			bottom: 10px;
		`
	)}
`;
