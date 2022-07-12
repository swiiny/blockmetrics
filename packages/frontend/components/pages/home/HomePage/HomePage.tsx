import React from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Main from '../../../../styles/layout/Main';
import HomeHeader from '../HomeHeader';

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
