import styled, { css } from 'styled-components';
import { ESize } from '../../utils/enum';
import { addTransition, getTextColor, setFontSize } from '../../utils/functions';
import { IBMLink } from './BMLink.type';

export const StyledBMLink = styled.a<IBMLink>`
	${(p) => css`
		${setFontSize(p.size || ESize.l)}
		${addTransition()}

    color: ${getTextColor(p)};

		&:hover {
			opacity: 0.5;
		}

		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		max-width: 100px;

		${p.inheritStyles
			? css`
					font-size: inherit !important;
					font-weight: inherit;
					letter-spacing: inherit;
					text-align: inherit;
					line-height: inherit;
			  `
			: ``}

		${p.weight ? `font-weight: ${p.weight} !important;` : ''}
	`}
`;
