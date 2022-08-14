import React, { FC } from 'react';
import Meta from '../components/utils/Meta';
import Flex from '../styles/layout/Flex';
import Main from '../styles/layout/Main';
import BMHeading from '../styles/theme/components/BMHeading';
import { ESize, EFlex, ETextType } from '../styles/theme/utils/enum';

const fallback: FC = () => (
	<>
		<Meta title='Offline' description='fallback' />

		<Main paddingTop={ESize.l}>
			<Flex vertical={EFlex.center} horizontal={EFlex.center}>
				<BMHeading type={ETextType.h1}>Offline</BMHeading>
			</Flex>
		</Main>
	</>
);

export default fallback;
