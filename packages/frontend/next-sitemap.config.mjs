/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: 'https://block-metrics.io',
	generateRobotsTxt: true,
	exclude: ['/documentation/api-rest'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/'
			}
		]
	}
};

export default config;
