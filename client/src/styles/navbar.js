import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// --  Media Queries  --
// At 767 width, the hamburger menu needs to be rendered
// At 1127 width, the main logo starts to wrap. Consider moving the the main logo on its own line and then move items to line below
const desktop = 1127;
const mobile = 767;

//  --  Navbar  --
export const StyledNavbar = styled.div`
  background-color: #131313;
  border-top: 1px solid #dedede;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
  padding-top: 30px;
  padding-bottom: 30px;

  @media (max-width: ${1127}px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
  };
  @media (max-width: ${767}px) {
    flex-direction: row;
  };
`

export const NavLogo = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  
  @media (max-width: ${1127}px) {
    justify-content: flex-start;
    width: 100%;
  };
  @media (max-width: ${767}px) {
    display: flex;
    justify-content: center;
  };
`

export const NavItems = styled.div`
  display: flex;
  flex-display: row;
  width: 80%;
  
  @media (max-width: ${1127}px) {
    width: 100%;
  };
`

export const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`

export const StyledMockLink = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;

  @media (max-width: ${767}px) {
    padding-left: 15px;
    padding-right: 15px;
  };
`

export const NavItem = styled.p`
  color: ${ props => props.title ? '#5c5c5c' : '#a8a8a8' };
  font-size: ${ props => props.title ? '20px' : '16px' };
  font-family: ${ props => props.title ? "'Archivo Black', sans-serif !important" : "Raleway', sans-serif !important" };
`
