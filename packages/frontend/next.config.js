/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // process.env.NODE_ENV === 'production',
	env: {
		SERVER_URL: process.env.SERVER_URL,
		API_URL: process.env.API_URL || 'https://api-rest.block-metrics.io',
		WS_URL: process.env.WS_URL || 'https://api-ws.block-metrics.io'
	},
	images: {
		minimumCacheTTL: 60 * 10
	},
	compiler: {
		// remove .babelrc to test these changes
		styledComponents: true, // ssr and displayName are configured by default
		removeConsole: process.env.NODE_ENV === 'production' // remove all console.*
	},
	eslint: {
		// Warning: Dangerously allow production builds to successfully complete even if
		// your project has ESLint errors.
		// ignoreDuringBuilds: true
	}
};

module.exports = nextConfig;
