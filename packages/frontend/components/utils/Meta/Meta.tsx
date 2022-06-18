import React, { FC } from 'react';
import Head from 'next/head';
import { IMeta } from './Meta.type';

// used to add title and meta tags to the page
const Meta: FC<IMeta> = ({ title, metas }) => (
	<Head>
		<title>{title}</title>
		<meta property='og:title' content={title} key='title' />

		{metas?.map(({ name, content }) => (
			<meta key={name} name={name} content={content} />
		))}
	</Head>
);

export { Meta };
