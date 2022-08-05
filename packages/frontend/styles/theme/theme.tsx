import { DefaultTheme } from 'styled-components';

export const defaultTheme = {
	radius: {
		s: '3px',
		m: '5px',
		l: '7px'
	},
	spacing: {
		unset: 'unset',
		'7xs': '1px',
		'6xs': '2px',
		'5xs': '4px',
		'4xs': '8px',
		'3xs': '12px',
		'2xs': '16px',
		xs: '20px',
		s: '24px',
		m: '32px',
		l: '40px',
		xl: '48px',
		'2xl': '64px',
		'3xl': '80px',
		'4xl': '100px',
		'5xl': '120px',
		'6xl': '140px',
		'7xl': '160px',
		'8xl': '180px'
	}
};

export const darkTheme: DefaultTheme = {
	...defaultTheme,
	colors: {
		// set theme colors
		bg: '#131923',
		darkGrey: '#3F4041',
		primary: '#79DCEF',
		secondary: '#0D9BD7',
		lightBlue: '#52BBE8',
		deepBlue: '#25A9DC',
		gradient: {
			toRight: 'linear-gradient(to right, #6AD4F3, #25A9DC)',
			toLeft: 'linear-gradient(to left, #6AD4F3, #25A9DC)',
			toTop: 'linear-gradient(to top, #6AD4F3, #25A9DC)',
			toBottom: 'linear-gradient(to bottom, #6AD4F3, #25A9DC)'
		},
		chart: {
			positive: {
				gradientStart: '#6BFFA6',
				gradientEnd: '#a6f5c6'
			},
			negative: {
				gradientStart: '#F22C3F',
				gradientEnd: '#f64f60'
			},
			default: {
				gradientStart: '#25A9DC',
				gradientEnd: '#6AD4F3'
			}
		},
		text: {
			default: '#FFFFFF',
			light: '#79DCEF',
			accent: '#6AD4F3',
			positive: '#6BFFA6',
			negative: '#F22C3F',
			warning: '#FFCA3A', // check color in figma
			disabled: '#7f7f7f'
		}
	}
};

export const lightTheme: DefaultTheme = {
	...defaultTheme,
	colors: {
		// set theme colors
		bg: '#131923',
		darkGrey: '#3F4041',
		primary: '#79DCEF',
		secondary: '#0D9BD7',
		lightBlue: '#52BBE8',
		deepBlue: '#25A9DC',
		gradient: {
			toRight: 'linear-gradient(to right, #6AD4F3, #25A9DC)',
			toLeft: 'linear-gradient(to left, #6AD4F3, #25A9DC)',
			toTop: 'linear-gradient(to top, #6AD4F3, #25A9DC)',
			toBottom: 'linear-gradient(to bottom, #6AD4F3, #25A9DC)'
		},
		chart: {
			positive: {
				gradientStart: '#6BFFA6',
				gradientEnd: '#a6f5c6'
			},
			negative: {
				gradientStart: '#F22C3F',
				gradientEnd: '#f64f60'
			},
			default: {
				gradientStart: '#25A9DC',
				gradientEnd: '#6AD4F3'
			}
		},
		text: {
			default: '#B3FCFF',
			light: '#79DCEF',
			accent: '#6AD4F3',
			positive: '#6BFFA6',
			negative: '#F22C3F',
			warning: '#FFCA3A', // check color in figma
			disabled: '#7f7f7f'
		}
	}
};
