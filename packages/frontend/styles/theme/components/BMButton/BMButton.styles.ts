import styled, { css } from 'styled-components';
import { EMediaQuery, ESize } from '../../utils/enum';
import { addTransition, mq } from '../../utils/functions';
import { IBMButton } from './BMButton.type';

export const StyledButton = styled.button<IBMButton>`
	border: none;
	background-color: transparent;
	padding: 0;

	${addTransition()}

	${(p) => css`
		${!p.disabled ? `cursor: pointer;` : ''}
		${p.fullWidth ? `width: 100%;` : ''}

    border-radius: 50px;

		${!p.secondary
			? `
      background: ${p.theme.colors.gradient.toTop};
      box-shadow: 0px 10px 20px rgba(69, 189, 230, 0.15), inset 0px 4px 7px rgba(36, 94, 114, 0.44);
      `
			: `
        background-color: transparent;
        border: 1px solid ${p.theme.colors.deepBlue};
      `}

		${() => {
			switch (p.size) {
				case ESize.s:
					return `
            padding: 16px 36px;
          `;
				case ESize.m:
					return `
            padding: 18px 43px;
          `;
				case ESize.l:
					return `
            padding: 28px 105px;

						${mq(EMediaQuery.sm, `padding: 28px 70px;`)}
          `;
				default:
					return `
            padding: 18px 46px;
          `;
			}
		}}

		${!p.disabled
			? css`
					&:hover {
						transform: scale(1.02);

						${p.secondary
							? `
              & > span {
							  color: ${p.theme.colors.text.light};
						  }
            `
							: ''}
					}

					&:active {
						transform: scale(0.98);
					}
			  `
			: ''}
	`}
`;
