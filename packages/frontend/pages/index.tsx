import React from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Meta from '../components/utils/Meta';
import Main from '../styles/layout/Main';
import Header from '../components/Header';

const HeaderData = {
	title: 'Lorem ipsum',
	subtitle: 'Lorem ipsu dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

const Home: NextPage = () => {
	return (
		<>
			<Meta title='Block metrics' />

			<Navbar />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main></Main>
		</>
	);
};

export default Home;
