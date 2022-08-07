import Image from 'next/image';
import React from 'react';
import Spacing from '../../../../styles/layout/Spacing';
import { ESize, ETextAlign } from '../../../../styles/theme/utils/enum';
import { StyledImageContainer, StyledList, StyledPoweredBySection } from './PoweredBySection.styles';
import BMText from '../../../../styles/theme/components/BMText';
import useResponsive from '../../../../hooks/useResponsive';

const SERVICES = [
	{
		logoSrc: '/assets/images/services/ankr.svg',
		href: 'https://www.ankr.com/'
	},
	{
		logoSrc: '/assets/images/services/etherscan.svg',
		href: 'https://etherscan.io'
	},
	{
		logoSrc: '/assets/images/services/polygonscan.svg',
		href: 'https://polygonscan.com'
	},
	{
		logoSrc: '/assets/images/services/bscscan.svg',
		href: 'https://bscscan.com'
	},
	{
		logoSrc: '/assets/images/services/snowtrace.svg',
		href: 'https://snowtrace.io'
	},
	{
		logoSrc: '/assets/images/services/digiconomist.svg',
		href: 'https://digiconomist.net/'
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
