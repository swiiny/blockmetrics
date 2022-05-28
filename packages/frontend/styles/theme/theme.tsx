import { DefaultTheme } from 'styled-components';

export const defaultTheme = {
	radius: {
		s: '3px',
		m: '5px',
		l: '7px'
	},
	spacing: {
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
		bg: '#121923',
		primary: '#79DCEF',
		secondary: '#0D9BD7',
		gradient: {
			toRight: 'linear-gradient(to right, #79DCEF, #0D9BD7)',
			toLeft: 'linear-gradient(to left, #79DCEF, #0D9BD7)',
			toTop: 'linear-gradient(to top, #79DCEF, #0D9BD7)',
			toBottom: 'linear-gradient(to bottom, #79DCEF, #0D9BD7)'
		},
		text: {
			default: '#B3FCFF',
			accent: '#0D9BD7',
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
		bg: '#121923',
		primary: '#79DCEF',
		secondary: '#0D9BD7',
		gradient: {
			toRight: 'linear-gradient(to right, #79DCEF, #0D9BD7)',
			toLeft: 'linear-gradient(to left, #79DCEF, #0D9BD7)',
			toTop: 'linear-gradient(to top, #79DCEF, #0D9BD7)',
			toBottom: 'linear-gradient(to bottom, #79DCEF, #0D9BD7)'
		},
		text: {
			default: '#B3FCFF',
			accent: '#0D9BD7',
			positive: '#6BFFA6',
			negative: '#F22C3F',
			warning: '#FFCA3A', // check color in figma
			disabled: '#7f7f7f'
		}
	}
};
