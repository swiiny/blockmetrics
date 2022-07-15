import Image from 'next/image';
import React from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMText from '../../../../styles/theme/components/BMText';
import TextWithGradient from '../../../../styles/theme/components/BMTextWithGradient';
import { EFlex, ESize } from '../../../../styles/theme/utils/enum';
import { FlexEx, StyledImageContainer, StyledTextContainer, TextEx } from './Presentation.styles';

const Presentation: React.FC = () => {
	return (
		<FlexEx horizontal={EFlex.between}>
			<StyledImageContainer>
				<Image src='/assets/images/dev.png' alt='Picture of Jeremy Theintz' width={1024} height={1024} layout='fill' />
			</StyledImageContainer>

			<StyledTextContainer>
				<BMText>Jeremy Theintz</BMText>
				<BMText size={ESize.s}>
					<TextWithGradient>Web3 builder</TextWithGradient>
				</BMText>

				<Spacing size={ESize.xs} />

				<TextEx opacityReduced>
					Lorem ispum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua.
				</TextEx>
			</StyledTextContainer>
		</FlexEx>
	);
};

export { Presentation };
