import styled, { css } from "styled-components";
import { EMediaQuery } from "../../styles/theme/utils/enum";
import { mq } from "../../styles/theme/utils/functions";


export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  
  z-index: 100;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export const StyledNavbarItem = styled.li`
  
  & > a {
    display: inline-block;
    margin: 0 ${(p) => p.theme.spacing.xs};
    padding: ${(p) => p.theme.spacing.xs} 0;
  }

`