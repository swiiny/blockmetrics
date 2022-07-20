import Image from 'next/image';
import React from 'react';
import Spacing from '../../../../styles/layout/Spacing';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import { ESize, ETextAlign, ETextType } from '../../../../styles/theme/utils/enum';
import { StyledImageContainer, StyledList, StyledPoweredBySection } from './PoweredBySection.styles';
import { motion, Variants } from 'framer-motion';
import BMText from '../../../../styles/theme/components/BMText';
import useResponsive from '../../../../hooks/useResponsive';

const SERVICES = [
	{
		logoSrc: '/assets/images/services/ankr.svg',
		href: ''
	},
	{
		logoSrc: '/assets/images/services/etherscan.svg',
		href: ''
	},
	{
		logoSrc: '/assets/images/services/polygonscan.svg',
		href: ''
	},
	{
		logoSrc: '/assets/images/services/bscscan.svg',
		href: ''
	},
	{
		logoSrc: '/assets/images/services/avascan.svg',
		href: ''
	}
];

const PoweredBySection: React.FC = ({ ...otherProps }) => {
	const { isSmallerThanMd } = useResponsive();

	return (
		<StyledPoweredBySection {...otherProps}>
			<BMText size={ESize['2xl']} textAlign={isSmallerThanMd ? ETextAlign.center : undefined}>
				Powered By
			</BMText>

			<Spacing size={ESize['l']} mdSize={ESize['2xl']} />

			<StyledList>
				{SERVICES.map(({ logoSrc, href }: { logoSrc: string; href: string }) => (
					<li key={logoSrc}>
						<a href={href} target='_blank' rel='noopener noreferrer'>
							<StyledImageContainer>
								<Image src={logoSrc} alt={href} layout='fill' objectFit='contain' />
							</StyledImageContainer>
						</a>
					</li>
				))}
			</StyledList>
		</StyledPoweredBySection>
	);
};

export { PoweredBySection };
