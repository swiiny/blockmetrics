import React from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import HomeHeader from '../HomeHeader';

const HeaderData = {
	title: 'Lorem ipsum',
	subtitle:
		'Lorem ipsu dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

const HomePage: NextPage = () => {
	return (
		<>
			<Meta title='Block metrics' />

			<Main>
				<HomeHeader />
			</Main>
		</>
	);
};

export { HomePage };
