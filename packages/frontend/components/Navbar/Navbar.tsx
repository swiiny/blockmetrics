import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import Flex from '../../styles/layout/Flex';
import Spacing from '../../styles/layout/Spacing';
import BMButton from '../../styles/theme/components/BMButton';
import BMText from '../../styles/theme/components/BMText';
import { EDocumentationId, EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../styles/theme/utils/enum';
import Collapse from '../utils/Collapse';
import {
	StyledNavbar,
	StyledNavbarItem,
	StyledList,
	StyledBurgerButton,
	StyledFace,
	StyledCube,
	StyledLogoContainer
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
	documentation: {
		label: 'Documentation',
		href: '/documentation'
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

	const navbarRef = useRef<any>();
	const [navbarBlurred, setNavbarBlurred] = useState(false);
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);

	const [burgerClickCount, incrementBurgerClickCount] = useReducer((count) => {
		if (count + 1 > 5) {
			return 0;
		} else {
			return count + 1;
		}
	}, 0);

	const handleBurgerClick = useCallback(() => {
		incrementBurgerClickCount();
		setIsNavbarOpen(!isNavbarOpen);
	}, [isNavbarOpen, incrementBurgerClickCount]);

	const closeNavbar = useCallback(() => {
		incrementBurgerClickCount();
		setIsNavbarOpen(false);
	}, [incrementBurgerClickCount]);

	const onClickOutside = useCallback(
		(event: MouseEvent) => {
			const { target } = event;

			if (!isNavbarOpen) {
				return;
			}

			// close navbar if click outside
			if (target instanceof Node && !navbarRef?.current?.contains(target)) {
				handleBurgerClick();
			}
		},
		[handleBurgerClick, isNavbarOpen]
	);

	const navbarHidden = useMemo(() => {
		if (pathname === INTERNAL_LINKS.story.href) {
			return true;
		}

		return false;
	}, [pathname]);

	const activeLabel = useMemo<string>(() => {
		try {
			if (pathname === '/') {
				return NAVBAR_LINKS.home.label;
			}

			const result = Object.values(NAVBAR_LINKS).find(({ href }): boolean => {
				if (pathname === href) {
					return true;
				}

				if (href !== '/' && pathname.includes(href)) {
					return true;
				}

				return false;
			});

			return result?.label || '';
		} catch {
			return '';
		}
	}, [pathname]);

	const navbarLinks = useMemo(() => {
		return (
			<StyledList>
				{Object.values(NAVBAR_LINKS).map(({ label, href }) => (
					<StyledNavbarItem key={href} onClick={isSmallerThanMd ? () => closeNavbar() : undefined}>
						<Link href={href}>
							<a>
								<BMText
									type={ETextType.span}
									inheritStyle={false}
									weight={ETextWeight.light}
									size={ESize.m}
									className={activeLabel === label ? 'navbar-active' : ''}
									textColor={activeLabel === label ? ETextColor.light : ETextColor.default}
								>
									{label}
								</BMText>
							</a>
						</Link>
					</StyledNavbarItem>
				))}
			</StyledList>
		);
	}, [activeLabel, closeNavbar, isSmallerThanMd]);

	const burgerButton = useMemo(() => {
		return (
			<StyledBurgerButton onClick={() => handleBurgerClick()} aria-label='Open or close navbar'>
				<StyledCube value={burgerClickCount}>
					{Array.from({ length: 6 }, (value, i) => (
						<StyledFace key={'face-' + value + '-' + i} faceIndex={i + 1} faceVisible={burgerClickCount === i}>
							<span />
							<span />
							<span />
						</StyledFace>
					))}
				</StyledCube>
			</StyledBurgerButton>
		);
	}, [burgerClickCount, handleBurgerClick]);

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

	useEffect(() => {
		if (isSmallerThanMd) {
			if (isNavbarOpen) {
				document.addEventListener('click', onClickOutside);
			} else {
				document.removeEventListener('click', onClickOutside);
			}
		}

		return () => {
			document.removeEventListener('click', onClickOutside);
		};
	}, [isNavbarOpen, onClickOutside, isSmallerThanMd]);

	return (
		<StyledNavbar ref={navbarRef} isHidden={navbarHidden} isBlurred={navbarBlurred}>
			<Flex fullWidth={isSmallerThanMd} vertical={EFlex.center} mdHorizontal={EFlex.between}>
				<Link href='/'>
					<a>
						<StyledLogoContainer>
							<Image src='/assets/logo.svg' alt='Blockmetrics logo' layout='fill' objectFit='contain' />
						</StyledLogoContainer>
					</a>
				</Link>

				<Spacing size={ESize.xl} />

				{isSmallerThanMd ? <>{burgerButton}</> : <>{navbarLinks}</>}
			</Flex>
			{!isSmallerThanMd ? (
				<Link href={NAVBAR_LINKS.documentation.href + '#' + EDocumentationId.whatIsABlockchain}>
					<a>
						<BMButton size={ESize.m} secondary onClick={() => {}}>
							What is a blockchain ?
						</BMButton>
					</a>
				</Link>
			) : (
				<Collapse isOpen={isNavbarOpen}>{navbarLinks}</Collapse>
			)}
		</StyledNavbar>
	);
};

export { Navbar };
