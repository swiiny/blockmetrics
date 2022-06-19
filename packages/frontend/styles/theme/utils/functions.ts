import { css, DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';
import { EMediaQuery, ESize, ETextColor } from './enum';

export const mq = (mediaQuery: EMediaQuery, children: string | FlattenSimpleInterpolation, minOrMax = 'max') => {
	return `@media only screen and (${minOrMax}-width: ${mediaQuery}) {
		${children}
	}`;
};

// add transition
export const addTransition = (target: string = 'all', duration: number = 0.4, timingFunction: string = 'ease') => {
	return `
		@media screen and (prefers-reduced-motion: no-preference) {
			transition: ${target} ${duration}s ${timingFunction};
		}
	`;
};

// set font size for normal text
export const setFontSize = (size: ESize) => {
	return css`
		${size === ESize.s
			? `
            font-size: 0.875rem;
            line-height: 1rem;
            `
			: size === ESize.m
			? `
            font-size: 1rem;
            line-height: 1.3rem;
            `
			: size === ESize.l
			? `
            font-size: 1.25rem;
            line-height: 1.63rem;
            `
			: size === ESize.xl
			? `
						font-size: 1.5rem;
						line-height: 2rem;
					`
			: size === ESize['2xl']
			? `
						font-size: 2rem;
						line-height: 1.5;
					`
			: size === ESize['3xl']
			? `
						font-size: 2.5rem;
						line-height: 1.5;
					`
			: size === ESize['4xl']
			? `
						font-size: 3.0rem;
						line-height: 1.5;
					`
			: ''};

		@media only screen and (max-width: ${EMediaQuery.sm}) {
			${size === ESize.s
				? `
            font-size: 0.75rem;
            line-height: 1rem;
            `
				: size === ESize.m
				? `
            font-size: 0.93rem;
            line-height: 1.22rem;
            `
				: size === ESize.l &&
				  `
            font-size: 1.125rem;
            line-height: 1.46rem;
            `}
		}
	`;
};

export const addPaddingStyles = (p: any) => {
	return css`
		${p.xlPadding ? mq(EMediaQuery.xl, `padding: ${p.theme.spacing[p.xlPadding]};`) : ''}
		${p.xlPaddingX
			? mq(
					EMediaQuery.xl,
					`padding-left: ${p.theme.spacing[p.xlPaddingX]}; padding-right: ${p.theme.spacing[p.xlPaddingX]};`
			  )
			: ''}
		${p.xlPaddingY
			? mq(
					EMediaQuery.xl,
					`padding-top: ${p.theme.spacing[p.xlPaddingY]}; padding-bottom: ${p.theme.spacing[p.xlPaddingY]};`
			  )
			: ''}
		${p.xlPaddingTop ? mq(EMediaQuery.xl, `padding-top: ${p.theme.spacing[p.xlPaddingTop]};`) : ''}
		${p.xlPaddingBottom ? mq(EMediaQuery.xl, `padding-bottom: ${p.theme.spacing[p.xlPaddingBottom]};`) : ''}
		${p.xlPaddingLeft ? mq(EMediaQuery.xl, `padding-left: ${p.theme.spacing[p.xlPaddingLeft]};`) : ''}
		${p.xlPaddingRight ? mq(EMediaQuery.xl, `padding-right: ${p.theme.spacing[p.xlPaddingRight]};`) : ''}
	

			${p.lgPadding ? mq(EMediaQuery.lg, `padding: ${p.theme.spacing[p.lgPadding]};`) : ''}
			${p.lgPaddingX
			? mq(
					EMediaQuery.lg,
					`padding-left: ${p.theme.spacing[p.lgPaddingX]}; padding-right: ${p.theme.spacing[p.lgPaddingX]};`
			  )
			: ''}
		${p.lgPaddingY
			? mq(
					EMediaQuery.lg,
					`padding-top: ${p.theme.spacing[p.lgPaddingY]}; padding-bottom: ${p.theme.spacing[p.lgPaddingY]};`
			  )
			: ''}
		${p.lgPaddingTop ? mq(EMediaQuery.lg, `padding-top: ${p.theme.spacing[p.lgPaddingTop]};`) : ''}
		${p.lgPaddingBottom ? mq(EMediaQuery.lg, `padding-bottom: ${p.theme.spacing[p.lgPaddingBottom]};`) : ''}
		${p.lgPaddingLeft ? mq(EMediaQuery.lg, `padding-left: ${p.theme.spacing[p.lgPaddingLeft]};`) : ''}
		${p.lgPaddingRight ? mq(EMediaQuery.lg, `padding-right: ${p.theme.spacing[p.lgPaddingRight]};`) : ''}

		
	${p.mdPadding ? mq(EMediaQuery.md, `padding: ${p.theme.spacing[p.mdPadding]};`) : ''}
			${p.mdPaddingX
			? mq(
					EMediaQuery.md,
					`padding-left: ${p.theme.spacing[p.mdPaddingX]}; padding-right: ${p.theme.spacing[p.mdPaddingX]};`
			  )
			: ''}
		${p.mdPaddingY
			? mq(
					EMediaQuery.md,
					`padding-top: ${p.theme.spacing[p.mdPaddingY]}; padding-bottom: ${p.theme.spacing[p.mdPaddingY]};`
			  )
			: ''}
		${p.mdPaddingTop ? mq(EMediaQuery.md, `padding-top: ${p.theme.spacing[p.mdPaddingTop]};`) : ''}
		${p.mdPaddingBottom ? mq(EMediaQuery.md, `padding-bottom: ${p.theme.spacing[p.mdPaddingBottom]};`) : ''}
		${p.mdPaddingLeft ? mq(EMediaQuery.md, `padding-left: ${p.theme.spacing[p.mdPaddingLeft]};`) : ''}
		${p.mdPaddingRight ? mq(EMediaQuery.md, `padding-right: ${p.theme.spacing[p.mdPaddingRight]};`) : ''}

		${p.smPadding ? mq(EMediaQuery.sm, `padding: ${p.theme.spacing[p.smPadding]};`) : ''}
			${p.smPaddingX
			? mq(
					EMediaQuery.sm,
					`padding-left: ${p.theme.spacing[p.smPaddingX]}; padding-right: ${p.theme.spacing[p.smPaddingX]};`
			  )
			: ''}
		${p.smPaddingY
			? mq(
					EMediaQuery.sm,
					`padding-top: ${p.theme.spacing[p.smPaddingY]}; padding-bottom: ${p.theme.spacing[p.smPaddingY]};`
			  )
			: ''}
		${p.smPaddingTop ? mq(EMediaQuery.sm, `padding-top: ${p.theme.spacing[p.smPaddingTop]};`) : ''}
		${p.smPaddingBottom ? mq(EMediaQuery.sm, `padding-bottom: ${p.theme.spacing[p.smPaddingBottom]};`) : ''}
		${p.smPaddingLeft ? mq(EMediaQuery.sm, `padding-left: ${p.theme.spacing[p.smPaddingLeft]};`) : ''}
		${p.smPaddingRight ? mq(EMediaQuery.sm, `padding-right: ${p.theme.spacing[p.smPaddingRight]};`) : ''}

			${p.padding ? `padding: ${p.theme.spacing[p.padding]};` : ''}
		${p.paddingX ? `padding-left: ${p.theme.spacing[p.paddingX]}; padding-right: ${p.theme.spacing[p.paddingX]};` : ''}
		${p.paddingY ? `padding-top: ${p.theme.spacing[p.paddingY]}; padding-bottom: ${p.theme.spacing[p.paddingY]};` : ''}
		${p.paddingTop ? `padding-top: ${p.theme.spacing[p.paddingTop]};` : ''}
		${p.paddingBottom ? `padding-bottom: ${p.theme.spacing[p.paddingBottom]};` : ''}
		${p.paddingLeft ? `padding-left: ${p.theme.spacing[p.paddingLeft]};` : ''}
		${p.paddingRight ? `padding-right: ${p.theme.spacing[p.paddingRight]};` : ''}
	`;
};

export function getSpacingFromESize(size: ESize, theme: DefaultTheme): string {
	// @ts-ignore
	return theme.spacing[size];
}

// convert ETextColor to to theme color
export const getTextColor = (p: any) => {
	switch (p.textColor) {
		case ETextColor.default:
			return `${p.theme.colors.text.default};`;
		case ETextColor.light:
			return `${p.theme.colors.text.light};`;
		case ETextColor.accent:
			return `${p.theme.colors.text.accent};`;
		case ETextColor.positive:
			return `${p.theme.colors.text.positive};`;
		case ETextColor.negative:
			return `${p.theme.colors.text.negative};`;
		case ETextColor.warning:
			return `${p.theme.colors.text.warning};`;
		case ETextColor.disabled:
			return `${p.theme.colors.text.disabled};`;
		default:
			return `${p.theme.colors.text.default};`;
	}
};
