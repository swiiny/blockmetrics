import styled from 'styled-components';
import { EMediaQuery } from '../../../../styles/theme/utils/enum';
import { addMarginStyles, mq } from '../../../../styles/theme/utils/functions';
import { IMargin } from '../../../../types/global';

export const StyledList = styled.ul<IMargin & { maxHeight?: string }>`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	width: 100%;

	max-height: ${(p) => (p.maxHeight ? p.maxHeight : '500px')};

	${(p) => addMarginStyles(p)};

	& > li {
		width: 45%;
	}

	${mq(
		EMediaQuery.lg,
		`
		max-height: unset;

		& > li {
			width: 100%;
		}
	`
	)}
`;

export const StyledSubitemsList = styled.ul`
	width: calc(100% - 12px);

	list-style: inside;
	list-style-position: outside;

	margin-left: 12px;
	margin-top: 5px;

	& > li {
		margin-bottom: 5px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;
