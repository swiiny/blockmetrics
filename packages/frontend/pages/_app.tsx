import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/theme/theme';
import { AppProps } from 'next/app';
import { combineReducers, defaultState } from '../reducers';
import mainReducer from '../reducers/mainReducer';
import { AppWrapper } from '../context/state';
import GlobalStyle from '../styles/theme/GlobalStyles';
import Navbar from '../components/Navbar';
import ToTopButton from '../components/utils/ToTopButton';

const appReducers = combineReducers({
	main: mainReducer
});

const BlockMetricsApp = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />

			<link rel='manifest' href='/manifest.json' />
			<link rel='apple-touch-icon' href='/icon.png'></link>

			<meta name='application-name' content='Blockmetrics' />
			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta name='apple-mobile-web-app-status-bar-style' content='default' />
			<meta name='apple-mobile-web-app-title' content='Blockmetrics' />
			<meta
				name='description'
				content='A tool to compare blockchains according to several parameters such as reliability, energy consumption, number of tokens and much more.'
			/>
			<meta name='format-detection' content='telephone=no' />
			<meta name='mobile-web-app-capable' content='yes' />
			<meta name='msapplication-config' content='/icons/browserconfig.xml' />
			<meta name='msapplication-TileColor' content='#79DCEF' />
			<meta name='msapplication-tap-highlight' content='no' />

			<meta name='theme-color' content='#131923' />
		</Head>

		<AppWrapper reducer={appReducers} initialState={defaultState}>
			<ThemeProvider theme={darkTheme}>
				<GlobalStyle />

				<ToTopButton />
				<Navbar />

				<Component {...pageProps} />
			</ThemeProvider>
		</AppWrapper>
	</>
);

export default BlockMetricsApp;
