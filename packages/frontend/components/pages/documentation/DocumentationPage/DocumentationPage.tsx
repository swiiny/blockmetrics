import React, { FC } from 'react';
import Main from '../../../../styles/layout/Main';
import { ESize } from '../../../../styles/theme/utils/enum';
import Header from '../../../Header';
import Meta from '../../../utils/Meta';

const HeaderData = {
	title: 'Documentation',
	subtitle: 'How the platform works and lexicon of terms'
};

const DocumentationPage = () => {
	return (
		<>
			<Meta title={HeaderData.title} />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main paddingTop={ESize.unset} noMarginTop>
				<></>
			</Main>
		</>
	);
};

export { DocumentationPage };
