import Image from 'next/image';
import React from 'react';
import useResponsive from '../../hooks/useResponsive';
import Flex from '../../styles/layout/Flex';
import Spacing from '../../styles/layout/Spacing';
import BMHeading from '../../styles/theme/components/BMHeading';
import BMText from '../../styles/theme/components/BMText';
import { EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../styles/theme/utils/enum';
import { StyledHeader, StyledImageContainer } from './Header.styles';
import { IHeader } from './Header.type';

const Header: React.FC<IHeader> = ({ title, subtitle, image, refreshAction = null }) => {
	const { isSmallerThanSm } = useResponsive();

	return (
		<StyledHeader>
			<Flex vertical={EFlex.center} horizontal={EFlex.between}>
				<Flex vertical={EFlex.center} wrapItems={false}>
					<BMHeading type={ETextType.h1}>{title}</BMHeading>

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

				{refreshAction && <button onClick={refreshAction}>refresh</button>}
			</Flex>

			<Spacing size={ESize.l} />

			<BMText weight={ETextWeight.semiBold} size={ESize.l} textColor={ETextColor.default} opacityReduced>
				{subtitle}
			</BMText>
		</StyledHeader>
	);
};

export { Header };
