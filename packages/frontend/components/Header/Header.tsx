import Image from 'next/image';
import React from 'react';
import useResponsive from '../../hooks/useResponsive';
import Flex from '../../styles/layout/Flex';
import Spacing from '../../styles/layout/Spacing';
import BMHeading from '../../styles/theme/components/BMHeading';
import BMText from '../../styles/theme/components/BMText';
import { EFlex, EPosition, ESize, ETextAlign, ETextColor, ETextType, ETextWeight } from '../../styles/theme/utils/enum';
import { BMBlockPatternEx } from '../pages/home/HomeHeader/HomeHeader.styles';
import Eclipse from '../utils/Eclipse';
import { StyledHeader, StyledImageContainer } from './Header.styles';
import { IHeader } from './Header.type';

const Header: React.FC<IHeader> = ({ title, titleSemiBold, subtitle, image }) => {
	const { isSmallerThanSm } = useResponsive();

	return (
		<StyledHeader>
			<BMBlockPatternEx size={ESize.s} />

			<Eclipse size={ESize.s} position={EPosition.right} zIndex={0} />

			<Flex direction={EFlex.column} vertical={EFlex.center} horizontal={EFlex.center} smVertical={EFlex.start}>
				<Flex fullWidth={isSmallerThanSm} vertical={EFlex.center} wrapItems={false}>
					<BMHeading type={ETextType.h1}>
						{title}
						{titleSemiBold && (
							<BMText type={ETextType.span} inheritStyle weight={ETextWeight.semiBold}>
								{' ' + titleSemiBold}
							</BMText>
						)}
					</BMHeading>

					{image ? (
						<>
							<Spacing size={!isSmallerThanSm ? ESize.m : ESize.s} />

							<StyledImageContainer>
								<img src={image} alt={title} />
							</StyledImageContainer>
						</>
					) : (
						<></>
					)}
				</Flex>

				<Spacing size={ESize.l} />

				<BMText
					weight={ETextWeight.light}
					size={ESize.m}
					textColor={ETextColor.default}
					textAlign={isSmallerThanSm ? ETextAlign.left : ETextAlign.center}
				>
					{subtitle}
				</BMText>
			</Flex>
		</StyledHeader>
	);
};

export { Header };
