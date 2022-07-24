import React, { FC } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMBlockPattern from '../../../../styles/theme/components/BMBlockPattern';
import BMButton from '../../../../styles/theme/components/BMButton';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import BMHivePattern from '../../../../styles/theme/components/BMHivePattern';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, EPosition, ESize, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';
import { NAVBAR_LINKS } from '../../../Navbar/Navbar';
import Eclipse from '../../../utils/Eclipse';
import { StyledHomeHeader } from './HomeHeader.styles';
import router from 'next/router';

const HomeHeader: FC = () => {
	const { isSmallerThanSm } = useResponsive();

	return (
		<StyledHomeHeader>
			<BMHivePattern />

			<BMBlockPattern />

			<Eclipse size={ESize.s} position={!isSmallerThanSm ? EPosition.topRight : EPosition.top} zIndex={0} />

			<Column columns={5} sm={12} md={8} xl={6}>
				<Flex direction={EFlex.column} fullWidth>
					<BMHeading type={ETextType.h1} weight={ETextWeight.light}>
						Blockchain
						<BMText type={ETextType.span} inheritStyle weight={ETextWeight.semiBold}>
							{` Data`}
						</BMText>
					</BMHeading>

					<Spacing size={ESize.m} />

					<BMText size={ESize.m} weight={ETextWeight.light}>
						{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
						industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
						scrambled it to make a type specimen book.`}
					</BMText>

					<Spacing size={ESize.xl} />

					<BMButton size={ESize.m} onClick={() => router.push(NAVBAR_LINKS.blockchains.href)}>
						<Eclipse size={ESize['2xs']} position={EPosition.topRight} zIndex={0} />
						See Blockchains Data
					</BMButton>
				</Flex>
			</Column>
		</StyledHomeHeader>
	);
};

export { HomeHeader };
