import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import Flex from '../../styles/layout/Flex';
import Spacing from '../../styles/layout/Spacing';
import BMButton from '../../styles/theme/components/BMButton';
import BMText from '../../styles/theme/components/BMText';
import { EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../styles/theme/utils/enum';
import {
	StyledNavbar,
	StyledNavbarItem,
	StyledList,
	StyledBurgerButton,
	StyledFace,
	StyledCube
} from './Navbar.styles';

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
	const { isSmallerThanMd } = useResponsive();

	const { pathname } = router;

	const [navbarBlurred, setNavbarBlurred] = useState(false);
	const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

	const navbarHidden = useMemo(() => {
		if (pathname === INTERNAL_LINKS.story.href) {
			return true;
		}

		return false;
	}, [pathname]);

	const navbarLinks = useMemo(() => {
		return (
			<StyledList>
				{Object.values(NAVBAR_LINKS).map(({ label, href }) => (
					<StyledNavbarItem key={href}>
						<Link href={href}>
							<a>
								<BMText
									type={ETextType.span}
									inheritStyle={false}
									weight={ETextWeight.light}
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
		);
	}, [pathname]);

	const [burgerClickCount, incrementBurgerClickCount] = useReducer((count) => {
		if (count + 1 > 5) {
			return 0;
		} else {
			return count + 1;
		}
	}, 0);

	const handleBurgerClick = useCallback(() => {
		incrementBurgerClickCount();
		setBurgerMenuOpen(!burgerMenuOpen);
	}, [burgerMenuOpen, incrementBurgerClickCount]);

	const burgerButton = useMemo(() => {
		return (
			<StyledBurgerButton onClick={() => handleBurgerClick()}>
				<StyledCube value={burgerClickCount}>
					{Array.from({ length: 6 }, (_, i) => (
						<StyledFace faceIndex={i + 1} faceVisible={burgerClickCount === i}>
							<span />
							<span />
							<span />
						</StyledFace>
					))}
				</StyledCube>
			</StyledBurgerButton>
		);
	}, [burgerMenuOpen, burgerClickCount]);

	useEffect(() => {
		// detect scroll and call blurNavbar after 100 px from top
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			if (scrollTop - 100 >= 0) {
				setNavbarBlurred(true);
			} else {
				setNavbarBlurred(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<StyledNavbar isHidden={navbarHidden} isBlurred={navbarBlurred}>
			<Flex vertical={EFlex.center} mdHorizontal={EFlex.between}>
				<div className='logo' />

				<Spacing size={ESize.xl} />

				{isSmallerThanMd ? <>{burgerButton}</> : <>{navbarLinks}</>}
			</Flex>

			<BMButton size={ESize.m} secondary onClick={() => alert('Work in progress')}>
				What is a blockchain ?
			</BMButton>
		</StyledNavbar>
	);
};

export { Navbar };
