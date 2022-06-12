import Image from 'next/image';
import React from 'react';
import useResponsive from '../../hooks/useResponsive';
import Flex from '../../styles/layout/Flex';
import Spacing from '../../styles/layout/Spacing';
import Heading from '../../styles/theme/components/Heading';
import Text from '../../styles/theme/components/Text';
import { EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../styles/theme/utils/enum';
import { StyledHeader, StyledImageContainer } from './Header.styles';
import { IHeader } from './Header.type';

const Header: React.FC<IHeader> = ({ title, subtitle, image, refreshAction = null }) => {
	const { isSmallerThanSm } = useResponsive();

	return (
		<StyledHeader>
			<Flex vertical={EFlex.center} horizontal={EFlex.between}>
				<Flex vertical={EFlex.center} wrapItems={false}>
					<Heading type={ETextType.h1}>{title}</Heading>

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

			<Text weight={ETextWeight.bold} size={ESize.l} textColor={ETextColor.default} opacityReduced>
				{subtitle}
			</Text>
		</StyledHeader>
	);
};

export { Header };
