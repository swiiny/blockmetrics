import styled from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { addMarginStyles, mq } from '../../../../styles/theme/utils/functions';
import { IMargin } from '../../../../types/layouts';

export const StyledChartList = styled.ul<IMargin>`
	display: flex;

	flex-wrap: wrap;
	width: 100%;

	${(p) => addMarginStyles(p)}

	gap: 30px;

	& > li {
		width: calc(33% - 20px);

		${mq(EMediaQuery.lg, `width: calc(50% - 20px);`)}
		${mq(EMediaQuery.sm, `width: 100%;`)}
	}
`;
