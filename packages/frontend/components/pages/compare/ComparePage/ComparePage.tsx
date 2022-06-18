import React from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';

const HeaderData = {
	title: 'Blockchains',
	subtitle: 'Here you can find the 10 most importants blockchains and a preview of their data'
};

const ComparePage: NextPage = () => {
	return (
		<>
			<Meta title={HeaderData.title} />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main></Main>
		</>
	);
};

export { ComparePage };
