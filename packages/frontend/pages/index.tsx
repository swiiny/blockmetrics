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

const Home: NextPage = () => {
	return (
		<>
			<Meta title='Block metrics' />

			<Navbar />

			<Main>
				<FlexEx vertical={EFlex.center} horizontal={EFlex.between}>
					<Heading type={ETextType.h1}>
						<TextWithGradient>Block metrics</TextWithGradient>
					</Heading>

					<Heading type={ETextType.h1}>
						<TextWithGradient>Block metrics</TextWithGradient>
					</Heading>
				</FlexEx>
			</Main>
		</>
	);
};

const FlexEx = styled(Flex)`
	height: 100vh;
`;

export default Home;
