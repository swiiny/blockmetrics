import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Main from '../../../../styles/layout/Main';
import Flex from '../../../../styles/layout/Flex';
import { EFlex, ESize, ESubscribeType, ETextAlign, ETextType } from '../../../../styles/theme/utils/enum';
import { motion, Variants } from 'framer-motion';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import { StyledFullHeightContainer, StyledHalfHeightContainer, StyledScreenHeightContainer } from '../story.styles';
import Spacing from '../../../../styles/layout/Spacing';
import { TitleAndValue } from '../TitleAndValue';
import BMButton from '../../../../styles/theme/components/BMButton';
import router from 'next/router';
import useWebsocket from '../../../../hooks/useWebsocket';
import { TBlockchain } from '../../../../types/blockchain';
import { IStoryBlockchainsData } from './StoryPage.type';

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
	const { subscribeTo, message } = useWebsocket();

	const [blockchainsData, setBlockchainsData] = useState<IStoryBlockchainsData>({});

	useEffect(() => {
		if (message?.channel === ESubscribeType.blockchains) {
			let newBlockchainsData = {
				powerConsumption: 0,
				todayTransactionCount: 0,
				transactionCount: 0,
				todayAddressUsed: 0,
				totalValueLocked: 0
			};

			message.data.forEach((blockchain: TBlockchain) => {
				newBlockchainsData.powerConsumption += blockchain?.blockchain_power_consumption || 0;
				newBlockchainsData.todayTransactionCount += blockchain?.today_transaction_count || 0;
				newBlockchainsData.transactionCount += blockchain?.transaction_count || 0;
				newBlockchainsData.todayAddressUsed += blockchain?.today_address_count || 0;
				newBlockchainsData.totalValueLocked += blockchain?.total_value_locked || 0;
			});

			setBlockchainsData(newBlockchainsData);
		}
	}, [message]);

	useEffect(() => {
		subscribeTo(ESubscribeType.blockchains);
	}, [subscribeTo]);

	return (
		<>
			<Meta title='Blockmetrics' />

			<Main noNavbar noMarginTop noPaddingBottom>
				<Flex direction={EFlex.column} vertical={EFlex.center}>
					<StyledScreenHeightContainer>
						<StyledFullHeightContainer>
							<BMHeading type={ETextType.h1} textAlign={ETextAlign.center}>
								Blockchains are power consumming
							</BMHeading>
						</StyledFullHeightContainer>

						<Animated>
							<TitleAndValue title='Last 24H' value={blockchainsData.powerConsumption} unit='Wh' />
						</Animated>

						<StyledHalfHeightContainer />

						<section>
							<Animated>
								<BMHeading type={ETextType.h1} textAlign={ETextAlign.center}>
									Blockchains are powerful
								</BMHeading>
							</Animated>

							<Spacing size={ESize['8xl']} />

							<Animated>
								<TitleAndValue title='Today transactions count' value={blockchainsData.todayTransactionCount} />
							</Animated>

							<Spacing size={ESize['2xl']} />

							<Animated>
								<TitleAndValue
									title='Total transactions count'
									value={blockchainsData.transactionCount + blockchainsData.todayTransactionCount}
								/>
							</Animated>
						</section>

						<StyledHalfHeightContainer />

						<section>
							<Animated>
								<BMHeading type={ETextType.h1} textAlign={ETextAlign.center}>
									Users are powerful
								</BMHeading>
							</Animated>

							<Spacing size={ESize['8xl']} />

							<Animated>
								<TitleAndValue title='Total Value Locked' value={blockchainsData.totalValueLocked} unit='$' />
							</Animated>

							<Spacing size={ESize['2xl']} />

							<Animated>
								<TitleAndValue
									title='Today Addresses used'
									value={blockchainsData.todayAddressUsed}
									customDuration={180}
								/>
							</Animated>
						</section>

						<StyledHalfHeightContainer />

						<section>
							<Animated>
								<BMHeading type={ETextType.h1} textAlign={ETextAlign.center}>
									Blockchains are even more than that...
								</BMHeading>
							</Animated>

							<Spacing size={ESize['8xl']} />

							<StyledFullHeightContainer>
								<Animated>
									<BMButton onClick={() => router.push('/')} size={ESize.l}>
										Discover
									</BMButton>
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
