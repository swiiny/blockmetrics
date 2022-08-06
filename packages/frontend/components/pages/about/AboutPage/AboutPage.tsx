import React from 'react';
import type { NextPage } from 'next';
import Header from '../../../Header';
import Flex from '../../../../styles/layout/Flex';
import {
	EFlex,
	EIcon,
	ESize,
	ETextAlign,
	ETextColor,
	ETextType,
	ETextWeight
} from '../../../../styles/theme/utils/enum';
import Presentation from '../Presentation';
import Spacing from '../../../../styles/layout/Spacing';
import BMText from '../../../../styles/theme/components/BMText';
import PoweredBySection from '../PoweredBySection';
import { FlexEx, TextEx } from './AboutPage.styles';
import Main from '../../../../styles/layout/Main';
import Meta from '../../../utils/Meta';
import AboutCard from '../AboutCard';

const HeaderData = {
	title: 'About',
	titleSemiBold: 'Blockmetrics'
};

const AboutPage: NextPage = () => {
	return (
		<>
			<Meta title='About' />

			<Header title={HeaderData.title} titleSemiBold={HeaderData.titleSemiBold} subtitle={HeaderData.subtitle} />

			<Main>
				<FlexEx direction={EFlex.column} vertical={EFlex.center} horizontal={EFlex.center}>
					<Presentation />

					<Spacing size={ESize['4xl']} />

					<Flex fullWidth horizontal={EFlex.between} lgDirection={EFlex.column}>
						<AboutCard
							icon={EIcon.issue}
							label='Your favorite blockchain isn’t listed?'
							link='https://github.com/JeremyTheintz/block-metrics/issues'
							bottomContent={
								<BMText size={ESize.m} textAlign={ETextAlign.center} weight={ETextWeight.light}>
									Create a
									<BMText type={ETextType.span} textColor={ETextColor.gradient} underline>
										{' Github issue '}
									</BMText>
									with some details
								</BMText>
							}
						/>

						<Spacing size={ESize['2xl']} />

						<AboutCard
							icon={EIcon.help}
							label='Want to help me improve Blockmetrics?'
							link='https://etherscan.io/address/0x123456ca3a7b8B5717dd99871167Fc3332805389'
							bottomContent={
								<TextEx size={ESize.m} underline textAlign={ETextAlign.center} textColor={ETextColor.gradient}>
									0x123456ca3a7b8B5717dd99871167Fc3332805389
								</TextEx>
							}
						/>
					</Flex>

					<Spacing size={ESize['4xl']} />

					<PoweredBySection />
				</FlexEx>
			</Main>
		</>
	);
};

export { AboutPage };
