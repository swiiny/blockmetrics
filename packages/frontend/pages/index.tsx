import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Meta from '../components/utils/Meta';
import Flex from '../styles/layout/Flex';
import Heading from '../styles/theme/components/Heading';
import TextWithGradient from '../styles/theme/components/TextWithGradient';
import { EFlex, ETextType } from '../styles/theme/utils/enum';
import Main from '../styles/layout/Main';
import Header from '../components/Header';

const Home: NextPage = () => {
	return (
		<>
			<Meta title='Block metrics' />

			<Navbar />

			<Header title='Ethereum' subtitle='Ethereum is a decentralized, open-source blockchain with smart contract functionality.' image='/assets/ethereum.svg' />

			<Main></Main>
		</>
	);
};

export default Home;
