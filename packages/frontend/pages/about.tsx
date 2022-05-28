import React from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Meta from '../components/utils/Meta';
import Main from '../styles/layout/Main';
import Header from '../components/Header';

const HeaderData = {
	title: 'About',
	subtitle: 'Blockchains data may be difficult to find and even more difficult to understand. That is exactly why Blockmetrics was built.'
};

const About: NextPage = () => {
	return (
		<>
			<Meta title='About' />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main></Main>
		</>
	);
};

export default About;
