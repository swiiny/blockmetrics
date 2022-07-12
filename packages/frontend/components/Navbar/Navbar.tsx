import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Flex from '../../styles/layout/Flex';
import Spacing from '../../styles/layout/Spacing';
import BMButton from '../../styles/theme/components/BMButton';
import BMText from '../../styles/theme/components/BMText';
import { EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../styles/theme/utils/enum';
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
		label: 'About Blockmetrics',
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
			<Flex vertical={EFlex.center}>
				<div className='logo' />

				<Spacing size={ESize.xl} />

				<StyledList>
					{Object.values(NAVBAR_LINKS).map(({ label, href }) => (
						<StyledNavbarItem key={href}>
							<Link href={href}>
								<a>
									<BMText
										type={ETextType.span}
										inheritStyle={false}
										weight={ETextWeight.thin}
										size={ESize.m}
										className={pathname === href ? 'navbar-active' : ''}
										textColor={pathname === href ? ETextColor.light : ETextColor.default}
									>
										{label}
									</BMText>
								</a>
							</Link>
						</StyledNavbarItem>
					))}
				</StyledList>
			</Flex>

			<BMButton size={ESize.m} secondary onClick={() => alert('Work in progress')}>
				What is a blockchain ?
			</BMButton>
		</StyledNavbar>
	);
};

export { Navbar };
