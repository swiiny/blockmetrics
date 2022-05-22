import Link from "next/link";
import React from "react";
import Text from "../../styles/theme/components/Text";
import { ESize, ETextType } from "../../styles/theme/utils/enum";
import { StyledNavbar, StyledNavbarItem, StyledList } from "./Navbar.styles";


export const NAVBAR_LINKS = {
  home: {
    label: "Home",
    href: "/",
  },
  blockchains: {
    label: "Blockchains",
    href: "/blockchains",
  },
  compare: {
    label: "Compare",
    href: "/compare",
  },
  about: {
    label: "About Block metrics",
    href: "/about",
  },
}

const Navbar = () => {

  return (
    <StyledNavbar>
      <div className="logo" />

      <StyledList>
        {Object.values(NAVBAR_LINKS).map(({ label, href }) => (
          <StyledNavbarItem key={href}>
            <Link href={href}>
              <a>
                <Text type={ETextType.span} inheritStyle={false} size={ESize.m}>
                  {label}
                </Text>
              </a>
            </Link>
          </StyledNavbarItem>
        ))}
      </StyledList>
    </StyledNavbar>
  )
}

export { Navbar };