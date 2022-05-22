import React from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Meta from '../components/utils/Meta';
import Main from '../styles/layout/Main';
import Header from '../components/Header';

const HeaderData = {
	title: 'Blockchains',
	subtitle: 'Here you can find the 10 most importants blockchains and a preview of their data'
};

const Blockchains: NextPage = () => {
	return (
		<>
			<Meta title='Blockchains' />

			<Navbar />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main></Main>
		</>
	);
};

export default Blockchains;
