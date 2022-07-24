import Image from 'next/image';
import React, { FC } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, ESize, ETextColor, ETextWeight } from '../../../../styles/theme/utils/enum';
import {
	BMCardContainerEx,
	StyledCitationContainer,
	StyledImageContainer,
	StyledTextContainer
} from './Presentation.styles';

const Creator: FC<{ isVisible?: boolean }> = ({ isVisible = true }) => {
	if (!isVisible) {
		return null;
	}

	return (
		<div>
			<BMText size={ESize['2xl']}>Jeremy Theintz</BMText>
			<BMText size={ESize.l} weight={ETextWeight.light} textColor={ETextColor.gradient}>
				Web3 builder
			</BMText>
		</div>
	);
};

const Presentation: React.FC = () => {
	const { isSmallerThanMd } = useResponsive();

	return (
		<BMCardContainerEx animateApparition>
			<StyledCitationContainer>
				<Image src='/assets/images/citation.svg' alt='' width={83} height={71} />
			</StyledCitationContainer>

			<Flex wrapItems={isSmallerThanMd} horizontal={EFlex.between} mdHorizontal={EFlex.start} padding={ESize.s}>
				<StyledImageContainer>
					<Image src='/assets/images/dev.png' alt='Picture of Jeremy Theintz' layout='fill' objectFit='contain' />
				</StyledImageContainer>

				<Spacing size={ESize.s} />

				<Creator isVisible={isSmallerThanMd} />

				<StyledTextContainer>
					<Creator isVisible={!isSmallerThanMd} />

					<Spacing size={ESize.xs} />

					<BMText size={ESize.xl} weight={ETextWeight.light}>
						Lorem ispum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua.
					</BMText>
				</StyledTextContainer>
			</Flex>
		</BMCardContainerEx>
	);
};

export { Presentation };
