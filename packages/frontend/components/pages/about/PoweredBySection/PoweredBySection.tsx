import Image from 'next/image';
import React from 'react';
import Spacing from '../../../../styles/layout/Spacing';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import { ESize, ETextAlign, ETextType } from '../../../../styles/theme/utils/enum';
import { StyledImageContainer, StyledList, StyledPoweredBySection } from './PoweredBySection.styles';
import { motion, Variants } from 'framer-motion';

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

const PoweredBySection: React.FC<{ variants: Variants }> = ({ variants, ...otherProps }: { variants: Variants }) => {
	return (
		<StyledPoweredBySection {...otherProps}>
			<motion.div initial='offscreen' whileInView='onscreen' variants={variants} viewport={{ once: true, amount: 0.8 }}>
				<BMHeading type={ETextType.h3} textAlign={ETextAlign.center}>
					Powered By
				</BMHeading>
			</motion.div>

			<Spacing size={ESize['3xl']} />

			<StyledList>
				{SERVICES.map(({ logoSrc, href }: { logoSrc: string; href: string }) => (
					<motion.li
						key={href}
						initial='offscreen'
						whileInView='onscreen'
						variants={variants}
						viewport={{ once: true, amount: 0.8 }}
					>
						<a href={href} target='_blank' rel='noopener noreferrer'>
							<StyledImageContainer>
								<Image src={logoSrc} alt={href} layout='fill' objectFit='contain' />
							</StyledImageContainer>
						</a>
					</motion.li>
				))}
			</StyledList>
		</StyledPoweredBySection>
	);
};

export { PoweredBySection };
