import dynamic from 'next/dynamic';
import React, { FC, Suspense } from 'react';
import Main from '../../../../styles/layout/Main';
import { ESize } from '../../../../styles/theme/utils/enum';
import Header from '../../../Header';
import Meta from '../../../utils/Meta';
import 'swagger-ui-react/swagger-ui.css';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMText from '../../../../styles/theme/components/BMText';
import useResponsive from '../../../../hooks/useResponsive';

// @ts-ignore
const SwaggerUI = dynamic<{ spec: any }>(import('swagger-ui-react'), { ssr: false });

const HeaderData = {
	title: 'REST API Documentation'
};

const DocumentationRestApiPage: FC = () => {
	const { isSmallerThanSm } = useResponsive();

	return (
		<>
			<Meta title={HeaderData.title} />

			<Header title={HeaderData.title} />

			<Main>
				{!isSmallerThanSm ? (
					<BMCardContainer padding={ESize.s} smPadding={ESize['4xs']} mdPadding={ESize['xs']}>
						<Suspense fallback={<BMText>Loading...</BMText>}>
							{/* @ts-ignore */}
							<SwaggerUI url='/rest-swagger.json' />
						</Suspense>
					</BMCardContainer>
				) : (
					<Suspense fallback={<BMText>Loading...</BMText>}>
						{/* @ts-ignore */}
						<SwaggerUI url='/rest-swagger.json' />
					</Suspense>
				)}
			</Main>
		</>
	);
};

export { DocumentationRestApiPage };
