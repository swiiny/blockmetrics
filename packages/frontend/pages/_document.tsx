import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default function BMDocument() {
	return (
		<Html lang='en'>
			<Head>
				<link href='https://use.typekit.net/mgc0tse.css' rel='stylesheet' />

				<meta
					name='viewport'
					content='width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable=no'
				/>

				{/*
				<link rel='preload' href='/fonts/icomoon.ttf' as='font' crossOrigin='' />
				<link rel='preload' href='/fonts/icomoon.eot' as='font' crossOrigin='' />
				<link rel='preload' href='/fonts/icomoon.woff' as='font' crossOrigin='' />
         */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

// @ts-ignore
BMDocument.getInitialProps = async (ctx) => {
	const sheet = new ServerStyleSheet();
	const originalRenderPage = ctx.renderPage;

	try {
		ctx.renderPage = () =>
			originalRenderPage({
				// @ts-ignore
				enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
			});

		// @ts-ignore
		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			)
		};
	} finally {
		sheet.seal();
	}
};
