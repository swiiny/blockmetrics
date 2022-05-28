import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../theme/utils/enum';
import { mq } from '../../theme/utils/functions';
import { IFlex } from './Flex.type';

export const StyledFlex = styled.div<IFlex>`
	display: flex;

	${(p) => (p.wrapItems ? 'flex-wrap: wrap;' : 'flex-wrap: nowrap;')}
	${(p) => (p.padding ? `padding: ${p.theme.spacing[p.padding]};` : '')}
	${(p) => (p.paddingX ? `padding-left: ${p.theme.spacing[p.paddingX]}; padding-right: ${p.theme.spacing[p.paddingX]};` : '')}
	${(p) => (p.paddingY ? `padding-top: ${p.theme.spacing[p.paddingY]}; padding-bottom: ${p.theme.spacing[p.paddingY]};` : '')}
	${(p) => (p.paddingTop ? `padding-top: ${p.theme.spacing[p.paddingTop]};` : '')}
	${(p) => (p.paddingBottom ? `padding-bottom: ${p.theme.spacing[p.paddingBottom]};` : '')}
	${(p) => (p.paddingLeft ? `padding-left: ${p.theme.spacing[p.paddingLeft]};` : '')}
	${(p) => (p.paddingRight ? `padding-right: ${p.theme.spacing[p.paddingRight]};` : '')}


	${(p) => {
		return css`
			${p.direction ? `flex-direction: ${p.direction};` : ''}
			${p.horizontal ? `justify-content: ${p.horizontal};` : ''}
			${p.vertical ? `align-items: ${p.vertical};` : ''}
			${p.fullWidth ? `width: 100%;` : ''}
			${p.fullHeight ? `height: 100%;` : ''}

			${p.smDirection || p.smHorizontal || p.smVertical
				? mq(
						EMediaQuery.sm,
						`
				${p.smDirection ? `flex-direction: ${p.smDirection};` : ''}
				${p.smHorizontal ? `justify-content: ${p.smHorizontal};` : ''}
				${p.smVertical ? `align-items: ${p.smVertical};` : ''}
			`
				  )
				: ''}

			${p.mdDirection || p.mdHorizontal || p.mdVertical
				? mq(
						EMediaQuery.md,
						`
				${p.mdDirection ? `flex-direction: ${p.mdDirection};` : ''}
				${p.mdHorizontal ? `justify-content: ${p.mdHorizontal};` : ''}
				${p.mdVertical ? `align-items: ${p.mdVertical};` : ''}
			`
				  )
				: ''}

			${p.lgDirection || p.lgHorizontal || p.lgVertical
				? mq(
						EMediaQuery.lg,
						`
				${p.lgDirection ? `flex-direction: ${p.lgDirection};` : ''}
				${p.lgHorizontal ? `justify-content: ${p.lgHorizontal};` : ''}
				${p.lgVertical ? `align-items: ${p.lgVertical};` : ''}
			`
				  )
				: ''}

			${p.xlDirection || p.xlHorizontal || p.xlVertical
				? mq(
						EMediaQuery.xl,
						`
				${p.xlDirection ? `flex-direction: ${p.xlDirection};` : ''}
				${p.xlHorizontal ? `justify-content: ${p.xlHorizontal};` : ''}
				${p.xlVertical ? `align-items: ${p.xlVertical};` : ''}
			`
				  )
				: ''}
		`;
	}}
`;
