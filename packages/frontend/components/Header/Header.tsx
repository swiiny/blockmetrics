import React from 'react';
import useResponsive from '../../hooks/useResponsive';
import Flex from '../../styles/layout/Flex';
import Spacing from '../../styles/layout/Spacing';
import BMHeading from '../../styles/theme/components/BMHeading';
import BMIcon from '../../styles/theme/components/BMIcon';
import BMText from '../../styles/theme/components/BMText';
import {
	EFlex,
	EIcon,
	EPosition,
	ESize,
	ETextAlign,
	ETextColor,
	ETextType,
	ETextWeight
} from '../../styles/theme/utils/enum';
import { BMBlockPatternEx } from '../pages/home/HomeHeader/HomeHeader.styles';
import Eclipse from '../utils/Eclipse';
import { StyledHeader } from './Header.styles';
import { IHeader } from './Header.type';

const Header: React.FC<IHeader> = ({ title, titleSemiBold, subtitle, icon }) => {
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

					{icon && icon !== EIcon.none ? (
						<>
							<Spacing size={!isSmallerThanSm ? ESize.m : ESize.s} />

							<BMIcon type={icon} size={ESize.l} />
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
