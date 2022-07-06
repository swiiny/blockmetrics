/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	/*
	env: {
		SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		API_URL: process.env.NEXT_PUBLIC_API_URL,
		WS_URL: process.env.NEXT_PUBLIC_WS_URL
	},*/
	compiler: {
		// remove .babelrc to test these changes
		styledComponents: true, // ssr and displayName are configured by default
		// removeConsole: true, // remove all console.*
		swcMinify: true // minify swc (fastest)
	},
	eslint: {
		// Warning: Dangerously allow production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true
	}
};

module.exports = nextConfig;
