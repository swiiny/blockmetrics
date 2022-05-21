// styled.d.ts
import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		radius: {
			s: string;
			m: string;
			l: string;
		};
		spacing: {
			"4xs": string;
			"3xs": string;
			"2xs": string;
			xs: string;
			s: string;
			m: string;
			l: string;
			xl: string;
			"2xl": string;
			"3xl": string;
			"4xl": string;
		};
		colors: {
			bg: string;
			primary: string;
			secondary: string;
            gradient: {
                toRight: string;
                toLeft: string;
                toTop: string;
                toBottom: string;
            };
			text: {
				default: string;
				accent: string;
				positive: string;
				negative: string;
				warning: string;
				disabled: string;
			};
		};
	}
}
