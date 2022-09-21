import React, { FC, ReactNode, useEffect, useState } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Main from '../../../../styles/layout/Main';
import Spacing from '../../../../styles/layout/Spacing';
import BMButton from '../../../../styles/theme/components/BMButton';
import { EFlex, EIcon, ESize, ESubscribeType, ETextAlign, ETextType } from '../../../../styles/theme/utils/enum';
import Header from '../../../Header';
import Meta from '../../../utils/Meta';
import router from 'next/router';
import useWebsocket from '../../../../hooks/useWebsocket';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import { TBlockchain } from '../../../../types/blockchain';
import { StyledScreenHeightContainer, StyledFullHeightContainer, StyledHalfHeightContainer } from './Error404.styles';
import { IStoryBlockchainsData } from './Error404.type';
import { TitleAndValue } from '../TitleAndValue';
import BMText from '../../../../styles/theme/components/BMText';
import BMIcon from '../../../../styles/theme/components/BMIcon';

// framer-motion crash if import is used
const { motion, Variants } = require('framer-motion');

const HeaderData = {
	title: 'Error 404',
	subtitle: 'The ressource you are looking for is not yet written in a block'
};

const sectionVariants: typeof Variants = {
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

const Animated = ({ children }: { children: ReactNode }) => (
	<motion.div
		initial='offscreen'
		whileInView='onscreen'
		variants={sectionVariants}
		viewport={{ once: true, amount: 0.8 }}
	>
		{children}
	</motion.div>
);

const Error404: FC = () => {
	const { subscribeTo, message } = useWebsocket();

	const [blockchainsData, setBlockchainsData] = useState<IStoryBlockchainsData>({});

	useEffect(() => {
		if (message?.channel === ESubscribeType.blockchains) {
			let newBlockchainsData = {
				powerConsumption: 0,
				todayTransactionCount: 0,
				todayUserCount: 0,
				transactionCount: 0,
				todayAddressUsed: 0,
				totalValueLocked: 0
			};

			message.data.forEach((blockchain: TBlockchain) => {
				newBlockchainsData.powerConsumption += blockchain?.blockchain_power_consumption || 0;
				newBlockchainsData.todayTransactionCount += blockchain?.today_transaction_count || 0;
				newBlockchainsData.todayUserCount += blockchain?.today_user_count || 0;
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
			<Meta title={HeaderData.title} description={HeaderData.subtitle} />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main noPaddingBottom>
				<Flex fullWidth direction={EFlex.column} vertical={EFlex.center}>
					<BMButton onClick={() => router.push('/')}>Go to the homepage</BMButton>

					{blockchainsData?.powerConsumption ? (
						<>
							<Spacing size={ESize.xl} />

							<BMText size={ESize.m} textAlign={ETextAlign.center}>
								Or you can...
							</BMText>

							<Spacing size={ESize.xl} />

							<BMIcon type={EIcon.arrowBottom} size={ESize.xs} />

							<StyledScreenHeightContainer>
								<StyledFullHeightContainer>
									<Animated>
										<BMHeading type={ETextType.h1} textAlign={ETextAlign.center} singleLine={false}>
											Blockchains are power consumming
										</BMHeading>
									</Animated>
								</StyledFullHeightContainer>

								<Animated>
									<TitleAndValue title='Last 24H' value={blockchainsData?.powerConsumption || 0} unit='Wh' />
								</Animated>

								<StyledHalfHeightContainer />

								<section>
									<Animated>
										<BMHeading type={ETextType.h1} textAlign={ETextAlign.center} singleLine={false}>
											Blockchains are powerful
										</BMHeading>
									</Animated>

									<Spacing size={ESize['8xl']} />

									<Animated>
										<TitleAndValue
											title='Today transactions count'
											value={blockchainsData?.todayTransactionCount || 0}
										/>
									</Animated>

									<Spacing size={ESize['2xl']} />

									<Animated>
										<TitleAndValue
											title='Total transactions count'
											value={(blockchainsData?.transactionCount || 0) + (blockchainsData?.todayTransactionCount || 0)}
										/>
									</Animated>
								</section>

								<StyledHalfHeightContainer />

								<section>
									<Animated>
										<BMHeading type={ETextType.h1} textAlign={ETextAlign.center} singleLine={false}>
											Users are powerful
										</BMHeading>
									</Animated>

									<Spacing size={ESize['8xl']} />

									<Animated>
										<TitleAndValue
											title='Today Users Count'
											value={blockchainsData?.todayUserCount || 0}
											customDuration={5 * 60}
										/>
									</Animated>

									<Spacing size={ESize['2xl']} />

									<Animated>
										<TitleAndValue
											title='Today Addresses used'
											value={blockchainsData?.todayAddressUsed || 0}
											customDuration={180}
										/>
									</Animated>

									<Spacing size={ESize['2xl']} />

									<Animated>
										<TitleAndValue title='Total Value Locked' value={blockchainsData?.totalValueLocked || 0} unit='$' />
									</Animated>
								</section>

								<StyledHalfHeightContainer />

								<section>
									<Animated>
										<BMHeading type={ETextType.h1} textAlign={ETextAlign.center} singleLine={false}>
											Blockchains are even more than that...
										</BMHeading>
									</Animated>

									<Spacing size={ESize['8xl']} />

									<StyledFullHeightContainer>
										<Animated>
											<BMButton onClick={() => router.push('/')} size={ESize.l}>
												Go to home page
											</BMButton>
										</Animated>
									</StyledFullHeightContainer>
								</section>
							</StyledScreenHeightContainer>
						</>
					) : (
						<></>
					)}
				</Flex>
			</Main>
		</>
	);
};

export { Error404 };
