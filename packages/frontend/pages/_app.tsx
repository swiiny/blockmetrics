import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/theme/theme';
import GlobalStyle from '../styles/theme/GlobalStyles';
import { AppProps } from 'next/app';
import { combineReducers, defaultState } from '../reducers';
import mainReducer from '../reducers/mainReducer';
import { AppWrapper } from '../context/state';

const appReducers = combineReducers({
  main: mainReducer,
})

const BlockMetricsApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </Head>

    <AppWrapper reducer={appReducers} initialState={defaultState}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppWrapper>
  </>
);

export default BlockMetricsApp;
