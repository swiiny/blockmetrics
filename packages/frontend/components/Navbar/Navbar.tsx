import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Text from '../../styles/theme/components/Text';
import { ESize, ETextColor, ETextType } from '../../styles/theme/utils/enum';
import { StyledNavbar, StyledNavbarItem, StyledList } from './Navbar.styles';

export const NAVBAR_LINKS = {
	home: {
		label: 'Home',
		href: '/'
	},
	blockchains: {
		label: 'Blockchains',
		href: '/blockchains'
	},
	compare: {
		label: 'Compare',
		href: '/compare'
	},
	about: {
		label: 'About',
		href: '/about'
	}
};

const Navbar = () => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<StyledNavbar>
			<div className='logo' />

			<StyledList>
				{Object.values(NAVBAR_LINKS).map(({ label, href }) => (
					<StyledNavbarItem key={href}>
						<Link href={href}>
							<a>
								<Text type={ETextType.span} inheritStyle={false} size={ESize.m} textColor={pathname === href ? ETextColor.gradient : ETextColor.default}>
									{label}
								</Text>
							</a>
						</Link>
					</StyledNavbarItem>
				))}
			</StyledList>
		</StyledNavbar>
	);
};

export { Navbar };
