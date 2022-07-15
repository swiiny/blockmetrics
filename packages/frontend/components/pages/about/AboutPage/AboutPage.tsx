import React from 'react';
import type { NextPage } from 'next';
import { motion, Variants } from 'framer-motion';
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
	subtitle:
		'Blockchains data may be difficult to find and even more difficult to understand. That is exactly why Blockmetrics is being built.'
};

const sectionVariants: Variants = {
	offscreen: {
		y: 100,
		opacity: 0.0
	},
	onscreen: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			bounce: 0.05,
			duration: 1.0
		}
	}
};

const AboutPage: NextPage = () => {
	return (
		<>
			<Meta title='About' />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main>
				<Flex direction={EFlex.column} vertical={EFlex.center}>
					<motion.section
						initial='offscreen'
						whileInView='onscreen'
						variants={sectionVariants}
						viewport={{ once: true, amount: 0.8 }}
					>
						<Presentation />
					</motion.section>

					<Spacing size={ESize['8xl']} />
					<Spacing size={ESize['8xl']} />

					<motion.section
						initial='offscreen'
						whileInView='onscreen'
						variants={sectionVariants}
						viewport={{ once: true, amount: 0.8 }}
					>
						<BMText opacityReduced size={ESize.xl} textAlign={ETextAlign.center}>
							Your favorite blockchain isn’t listed?
						</BMText>

						<Spacing size={ESize.xs} />

						<a href='https://github.com/JeremyTheintz/block-metrics/issues' target='_blank' rel='noopener noreferrer'>
							<BMText size={ESize['2xl']} textAlign={ETextAlign.center}>
								Create a <TextWithGradient>Github issue</TextWithGradient> with some details
							</BMText>
						</a>
					</motion.section>

					<Spacing size={ESize['8xl']} />
					<Spacing size={ESize['8xl']} />

					<motion.section
						initial='offscreen'
						whileInView='onscreen'
						variants={sectionVariants}
						viewport={{ once: true, amount: 0.8 }}
					>
						<BMText size={ESize['xl']} textAlign={ETextAlign.center}>
							Want to help me improve Blockmetrics?
						</BMText>

						<Spacing size={ESize.xs} />

						<TextEx size={ESize['2xl']} textAlign={ETextAlign.center}>
							<TextWithGradient>0x123456ca3a7b8B5717dd99871167Fc3332805389</TextWithGradient>
						</TextEx>
					</motion.section>

					<Spacing size={ESize['8xl']} />
					<Spacing size={ESize['8xl']} />

					<PoweredBySection variants={sectionVariants} />
				</Flex>
			</Main>
		</>
	);
};

export { AboutPage };
