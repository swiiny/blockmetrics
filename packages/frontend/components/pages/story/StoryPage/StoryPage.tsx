import React from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Main from '../../../../styles/layout/Main';
import Flex from '../../../../styles/layout/Flex';
import { EFlex, ESize, ETextAlign, ETextType } from '../../../../styles/theme/utils/enum';
import { motion, Variants } from 'framer-motion';
import Heading from '../../../../styles/theme/components/Heading';
import { StyledFullHeightContainer, StyledHalfHeightContainer, StyledScreenHeightContainer } from '../story.styles';
import Spacing from '../../../../styles/layout/Spacing';
import { TitleAndValue } from '../TitleAndValue';
import Text from '../../../../styles/theme/components/Text';
import TextWithGradient from '../../../../styles/theme/components/TextWithGradient';

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
			bounce: 0.1,
			duration: 0.8
		}
	}
};

const Animated = ({ children }: { children: React.ReactNode }) => (
	<motion.div
		initial='offscreen'
		whileInView='onscreen'
		variants={sectionVariants}
		viewport={{ once: true, amount: 0.8 }}
	>
		{children}
	</motion.div>
);

const StoryPage: NextPage = () => {
	return (
		<>
			<Meta title='Blockmetrics' />

			<Main noNavbar>
				<Flex direction={EFlex.column} vertical={EFlex.center}>
					<StyledScreenHeightContainer>
						<StyledFullHeightContainer>
							<Heading type={ETextType.h1} textAlign={ETextAlign.center}>
								Blockchains are power consumming
							</Heading>
						</StyledFullHeightContainer>

						<Animated>
							<TitleAndValue title='Last 24H' value={123456789} unit='W' />
						</Animated>

						<StyledHalfHeightContainer />

						<section>
							<Animated>
								<Heading type={ETextType.h1} textAlign={ETextAlign.center}>
									Blockchains are powerful
								</Heading>
							</Animated>

							<Spacing size={ESize['8xl']} />

							<Animated>
								<TitleAndValue title='Last 24H transactions' value={9626344875} />
							</Animated>

							<Spacing size={ESize['2xl']} />

							<Animated>
								<TitleAndValue title='Total transactions count' value={2109626344875} />
							</Animated>

							<Spacing size={ESize['8xl']} />

							<Animated>
								<TitleAndValue title='Last 24H new smart contracts' value={26344875} />
							</Animated>

							<Spacing size={ESize['2xl']} />

							<Animated>
								<TitleAndValue title='Total smart contracts count' value={26344875001} />
							</Animated>
						</section>

						<StyledHalfHeightContainer />

						<section>
							<Animated>
								<Heading type={ETextType.h1} textAlign={ETextAlign.center}>
									Users are powerful
								</Heading>
							</Animated>

							<Spacing size={ESize['8xl']} />

							<Animated>
								<TitleAndValue title='Last 24H new users' value={137004} />
							</Animated>

							<Spacing size={ESize['2xl']} />

							<Animated>
								<TitleAndValue title='Last 24H active users' value={54137982} />
							</Animated>

							<Spacing size={ESize['2xl']} />

							<Animated>
								<TitleAndValue title='Total users count' value={1054637889} />
							</Animated>
						</section>

						<StyledHalfHeightContainer />

						<section>
							<Animated>
								<Heading type={ETextType.h1} textAlign={ETextAlign.center}>
									Blockchains are even more...
								</Heading>
							</Animated>

							<Spacing size={ESize['8xl']} />

							<StyledFullHeightContainer>
								<Animated>
									<Text textAlign={ETextAlign.center}>
										<TextWithGradient>Discover</TextWithGradient>
									</Text>
								</Animated>
							</StyledFullHeightContainer>
						</section>
					</StyledScreenHeightContainer>
				</Flex>
			</Main>
		</>
	);
};

export { StoryPage };
