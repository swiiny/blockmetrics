const env = {
	SERVER_URL: process.env.SERVER_URL,
	API_URL: process.env.API_URL,
	WS_URL: process.env.WS_URL
};

console.log('env', env);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: { ...env },
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

console.log('nextConfig', nextConfig);

module.exports = nextConfig;
