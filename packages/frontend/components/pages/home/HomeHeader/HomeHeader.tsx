import Image from 'next/image';
import React, { FC } from 'react';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMButton from '../../../../styles/theme/components/BMButton';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, EPosition, ESize, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';
import Eclipse from '../../../utils/Eclipse';
import {
	StyledBlockImage,
	StyledBlockPattern,
	StyledGradientLine,
	StyledHiveImage,
	StyledHivePattern,
	StyledHomeHeader
} from './HomeHeader.styles';

const HomeHeader: FC = () => {
	return (
		<StyledHomeHeader>
			<StyledHivePattern>
				<StyledHiveImage src='/assets/images/pattern-1.svg' alt='' draggable={false} />
			</StyledHivePattern>

			<StyledBlockPattern>
				<StyledBlockImage src='/assets/images/pattern-2.svg' alt='' draggable={false} />
			</StyledBlockPattern>

			<Eclipse size={ESize.s} position={EPosition.topRight} zIndex={0} />

			<Column columns={5} sm={12} md={8} xl={6}>
				<Flex direction={EFlex.column} fullWidth>
					<StyledGradientLine />

					<Spacing size={ESize.m} />

					<BMHeading type={ETextType.h1} weight={ETextWeight.light}>
						Blockchain
						<BMText type={ETextType.span} weight={ETextWeight.semiBold}>
							{` Data`}
						</BMText>
					</BMHeading>

					<Spacing size={ESize.m} />

					<BMText size={ESize.m} weight={ETextWeight.light}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
						scrambled it to make a type specimen book.
					</BMText>

					<Spacing size={ESize.xl} />

					<BMButton size={ESize.m}>
						<Eclipse size={ESize['2xs']} position={EPosition.topRight} zIndex={0} />
						See Blockchains Data
					</BMButton>
				</Flex>
			</Column>
		</StyledHomeHeader>
	);
};

export { HomeHeader };
