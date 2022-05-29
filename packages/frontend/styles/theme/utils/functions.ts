import { css, FlattenSimpleInterpolation } from 'styled-components';
import { EMediaQuery, ESize } from './enum';

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
