import React from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import Meta from '../components/utils/Meta';
import Main from '../styles/layout/Main';
import Header from '../components/Header';
import Flex from '../styles/layout/Flex';

const HeaderData = {
	title: 'About',
	subtitle: 'Blockchains data may be difficult to find and even more difficult to understand. That is exactly why Blockmetrics is being built.'
};

const About: NextPage = () => {
	return (
		<>
			<Meta title='About' />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main>
				<Flex></Flex>
			</Main>
		</>
	);
};

export default About;
