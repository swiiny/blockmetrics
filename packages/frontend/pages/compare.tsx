import React from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Meta from '../components/utils/Meta';
import Main from '../styles/layout/Main';
import Header from '../components/Header';

const HeaderData = {
	title: 'Compare',
	subtitle: 'you can compare the blockchains with each other according to several parameters such as reliability, power consumption, number of tokens and many other things'
};

const Compare: NextPage = () => {
	return (
		<>
			<Meta title='Compare' />

			<Navbar />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main></Main>
		</>
	);
};

export default Compare;
