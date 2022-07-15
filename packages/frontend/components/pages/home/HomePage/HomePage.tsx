import React from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Main from '../../../../styles/layout/Main';
import HomeHeader from '../HomeHeader';
import HomeData from '../HomeData';
import Spacing from '../../../../styles/layout/Spacing';
import { ESize } from '../../../../styles/theme/utils/enum';

const HomePage: NextPage = () => {
	return (
		<>
			<Meta title='Block metrics' />

			<Main>
				<HomeHeader />

				<Spacing size={ESize['2xl']} />

				<HomeData />
			</Main>
		</>
	);
};

export { HomePage };
