import React from 'react';
import type { NextPage } from 'next';
import Header from '../../../Header';
import Flex from '../../../../styles/layout/Flex';
import { EFlex, ESize, ETextAlign } from '../../../../styles/theme/utils/enum';
import Presentation from '../Presentation';
import Spacing from '../../../../styles/layout/Spacing';
import TextWithGradient from '../../../../styles/theme/components/BMTextWithGradient';
import BMText from '../../../../styles/theme/components/BMText';
import PoweredBySection from '../PoweredBySection';
import { TextEx } from './AboutPage.styles';
import Main from '../../../../styles/layout/Main';
import Meta from '../../../utils/Meta';

const HeaderData = {
	title: 'About',
	titleSemiBold: 'Blockmetrics',
	subtitle:
		'Blockchains data may be difficult to find and even more difficult to understand. That is exactly why Blockmetrics is being built.'
};

const AboutPage: NextPage = () => {
	return (
		<>
			<Meta title='About' />

			<Header title={HeaderData.title} titleSemiBold={HeaderData.titleSemiBold} subtitle={HeaderData.subtitle} />

			<Main>
				<Flex direction={EFlex.column} vertical={EFlex.center}>
					<section>
						<Presentation />
					</section>

					<Spacing size={ESize['8xl']} />
					<Spacing size={ESize['8xl']} />

					<section>
						<BMText opacityReduced size={ESize.xl} textAlign={ETextAlign.center}>
							Your favorite blockchain isn’t listed?
						</BMText>

						<Spacing size={ESize.xs} />

						<a href='https://github.com/JeremyTheintz/block-metrics/issues' target='_blank' rel='noopener noreferrer'>
							<BMText size={ESize['2xl']} textAlign={ETextAlign.center}>
								Create a <TextWithGradient>Github issue</TextWithGradient> with some details
							</BMText>
						</a>
					</section>

					<Spacing size={ESize['8xl']} />
					<Spacing size={ESize['8xl']} />

					<section>
						<BMText size={ESize['xl']} textAlign={ETextAlign.center}>
							Want to help me improve Blockmetrics?
						</BMText>

						<Spacing size={ESize.xs} />

						<TextEx size={ESize['2xl']} textAlign={ETextAlign.center}>
							<TextWithGradient>0x123456ca3a7b8B5717dd99871167Fc3332805389</TextWithGradient>
						</TextEx>
					</section>

					<Spacing size={ESize['8xl']} />
					<Spacing size={ESize['8xl']} />

					<PoweredBySection />
				</Flex>
			</Main>
		</>
	);
};

export { AboutPage };
