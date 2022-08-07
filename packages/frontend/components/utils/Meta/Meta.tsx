import React, { FC } from 'react';
import Head from 'next/head';
import { IMeta } from './Meta.type';

// used to add title and meta tags to the page
const Meta: FC<IMeta> = ({ title, description, metas }) => (
	<Head>
		<title>{title}</title>
		<meta name='description' content={description} />
		<meta name='author' content='Blockmetrics' />
		<meta name='copyright' content='Copyright Blockmetrics ©' />
		<meta name='language' content='English' />
		<meta name='robots' content='index, follow' />
		<meta name='keywords' content={`Blockchain,metrics,Blockmetrics,${title}`} />

		<meta property='og:title' content={title} key='title' />
		<meta property='og:description' content={description} />

		<meta property='og:image' content='https://block-metrics.io/thumbnail.png' />

		<meta name='twitter:card' content='summary' />
		<meta name='twitter:site' content='@Swiiny_' />
		<meta name='twitter:title' content={title} />
		<meta name='twitter:description' content={description} />
		<meta name='twitter:image' content='https://block-metrics.io/thumbnail-twitter-2.png' />
		<meta name='twitter:image:alt' content='blockmetrics twitter card' />

		{metas?.map(({ name, content }) => (
			<meta key={name} name={name} content={content} />
		))}
	</Head>
);

export { Meta };
