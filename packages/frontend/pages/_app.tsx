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
