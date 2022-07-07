import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import Text from '../../styles/theme/components/Text';
import { ESize, ETextColor, ETextType } from '../../styles/theme/utils/enum';
import { axiosServer } from '../../utils/variables';
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

export const INTERNAL_LINKS = {
	story: {
		label: 'Story',
		href: '/story'
	}
};

const Navbar = () => {
	const router = useRouter();
	const { pathname } = router;

	const navbarHidden = useMemo(() => {
		if (pathname === INTERNAL_LINKS.story.href) {
			return true;
		}

		return false;
	}, [pathname]);

	return (
		<StyledNavbar isHidden={navbarHidden}>
			<div className='logo' />

			<StyledList>
				{Object.values(NAVBAR_LINKS).map(({ label, href }) => (
					<StyledNavbarItem key={href}>
						<Link href={href}>
							<a>
								<Text
									type={ETextType.span}
									inheritStyle={false}
									size={ESize.m}
									textColor={pathname === href ? ETextColor.gradient : ETextColor.default}
								>
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
