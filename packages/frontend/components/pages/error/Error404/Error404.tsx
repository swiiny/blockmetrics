import React, { FC } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Main from '../../../../styles/layout/Main';
import Spacing from '../../../../styles/layout/Spacing';
import BMButton from '../../../../styles/theme/components/BMButton';
import { EFlex, ESize } from '../../../../styles/theme/utils/enum';
import Header from '../../../Header';
import Meta from '../../../utils/Meta';
import router from 'next/router';

const HeaderData = {
	title: 'Error 404',
	subtitle: 'The ressource you are looking for is not yet written in a block'
};

const Error404: FC = () => {
	return (
		<>
			<Meta title='404' />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main>
				<Flex fullWidth direction={EFlex.column} vertical={EFlex.center}>
					<BMButton onClick={() => router.push('/')}>Get back to the homepage</BMButton>

					<Spacing size={ESize.m} />

					<BMButton onClick={() => router.push('/story')} secondary>
						A new way to discover global data
					</BMButton>
				</Flex>
			</Main>
		</>
	);
};

export { Error404 };
