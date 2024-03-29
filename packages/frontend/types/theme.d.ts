// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		radius: {
			s: string;
			m: string;
			l: string;
		};
		spacing: {
			unset: string;
			'7xs': string;
			'6xs': string;
			'5xs': string;
			'4xs': string;
			'3xs': string;
			'2xs': string;
			xs: string;
			s: string;
			m: string;
			l: string;
			xl: string;
			'2xl': string;
			'3xl': string;
			'4xl': string;
			'5xl': string;
			'6xl': string;
			'7xl': string;
			'8xl': string;
		};
		colors: {
			bg: string;
			darkGrey: string;
			primary: string;
			secondary: string;
			deepBlue: string;
			lightBlue: string;
			gradient: {
				toRight: string;
				toLeft: string;
				toTop: string;
				toBottom: string;
			};
			chart: {
				positive: {
					gradientStart: string;
					gradientEnd: string;
				};
				negative: {
					gradientStart: string;
					gradientEnd: string;
				};
				default: {
					gradientStart: string;
					gradientEnd: string;
				};
			};
			text: {
				default: string;
				light: string;
				accent: string;
				positive: string;
				negative: string;
				warning: string;
				disabled: string;
			};
		};
	}
}
