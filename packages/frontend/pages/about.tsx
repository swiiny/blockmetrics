import React from 'react';
import type { NextPage } from 'next';
import Meta from '../components/utils/Meta';
import Main from '../styles/layout/Main';
import Header from '../components/Header';
import Flex from '../styles/layout/Flex';
import Presentation from '../components/pages/about/Presentation';
import { EFlex, ESize, ETextAlign } from '../styles/theme/utils/enum';
import Spacing from '../styles/layout/Spacing';
import Heading from '../styles/theme/components/Heading';
import TextWithGradient from '../styles/theme/components/TextWithGradient';
import { TextEx } from '../components/pages/about/About.styles';
import PoweredBySection from '../components/pages/about/PoweredBySection';
import Text from '../styles/theme/components/Text';

const HeaderData = {
	title: 'About',
	subtitle: 'Blockchains data may be difficult to find and even more difficult to understand. That is exactly why Blockmetrics is being built.'
};

const About: NextPage = () => {
	return (
		<>
			<Meta title='About' />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main>
				<Flex direction={EFlex.column} vertical={EFlex.center}>
					<section>
						<Presentation />
					</section>

					<Spacing size={ESize['8xl']} />

					<section>
						<Text opacityReduced size={ESize.m} textAlign={ETextAlign.center}>
							Your favorite blockchain isn’t listed?
						</Text>

						<Spacing size={ESize.xs} />

						<a href='https://github.com/JeremyTheintz/block-metrics/issues' target='_blank' rel='noopener noreferrer'>
							<Text size={ESize.l} textAlign={ETextAlign.center}>
								Create a <TextWithGradient>Github issue</TextWithGradient> with some details
							</Text>
						</a>
					</section>

					<Spacing size={ESize['8xl']} />

					<section style={{ width: '100%' }}>
						<Text size={ESize.m} opacityReduced textAlign={ETextAlign.center}>
							Want to help me improve Blockmetrics?
						</Text>

						<Spacing size={ESize.xs} />

						<TextEx size={ESize.l} textAlign={ETextAlign.center}>
							<TextWithGradient>0x123456ca3a7b8B5717dd99871167Fc3332805389</TextWithGradient>
						</TextEx>
					</section>

					<Spacing size={ESize['8xl']} />

					<PoweredBySection />
				</Flex>
			</Main>
		</>
	);
};

export default About;
