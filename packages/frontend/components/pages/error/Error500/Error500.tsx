import React, { FC } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Main from '../../../../styles/layout/Main';
import BMButton from '../../../../styles/theme/components/BMButton';
import { EFlex } from '../../../../styles/theme/utils/enum';
import Header from '../../../Header';
import Meta from '../../../utils/Meta';
import router from 'next/router';

const HeaderData = {
	title: 'Error 500',
	subtitle: 'It looks like something went wrong on our end, please try again later'
};

const Error500: FC = () => {
	return (
		<>
			<Meta title={HeaderData.title} description={HeaderData.subtitle} />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main noPaddingBottom>
				<Flex fullWidth direction={EFlex.column} vertical={EFlex.center}>
					<BMButton onClick={() => router.push('/')}>Go to the homepage</BMButton>
				</Flex>
			</Main>
		</>
	);
};

export { Error500 };
