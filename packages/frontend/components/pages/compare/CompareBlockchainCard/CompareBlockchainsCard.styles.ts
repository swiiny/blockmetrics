import styled, { css } from 'styled-components';
import BMGradientSeparator from '../../../../styles/theme/components/BMGradientSeparator';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { addTransition, mq } from '../../../../styles/theme/utils/functions';

export const StyledListItem = styled.li<{ isVisible?: boolean }>`
	${(p) => css`
		position: relative;
		width: 100%;
	`}
`;

export const BMGradientSeparatorEx = styled(BMGradientSeparator)`
	height: 60px;

	${mq(
		EMediaQuery.md,
		`
		height: 1px;
	`
	)}
`;
