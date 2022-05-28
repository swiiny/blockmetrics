import Image from 'next/image';
import React from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import Text from '../../../../styles/theme/components/Text';
import TextWithGradient from '../../../../styles/theme/components/TextWithGradient';
import { EFlex, ESize } from '../../../../styles/theme/utils/enum';
import { FlexEx, StyledImageContainer, StyledTextContainer, TextEx } from './Presentation.styles';

const Presentation: React.FC = () => {
	return (
		<FlexEx horizontal={EFlex.between}>
			<StyledImageContainer>
				<Image src='/assets/images/dev.png' alt='Picture of Jeremy Theintz' width={1024} height={1024} layout='fill' />
			</StyledImageContainer>

			<StyledTextContainer>
				<Text>Jeremy Theintz</Text>
				<Text size={ESize.s}>
					<TextWithGradient>Web3 builder</TextWithGradient>
				</Text>

				<Spacing size={ESize.xs} />

				<TextEx opacityReduced>Lorem ispum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</TextEx>
			</StyledTextContainer>
		</FlexEx>
	);
};

export { Presentation };
