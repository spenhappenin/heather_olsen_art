import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// --  Media Queries  --
// At 767 width, the hamburger menu needs to be rendered
// At 1127 width, the main logo starts to wrap. Consider moving the the main logo on its own line and then move items to line below

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

  @media (max-width: 1127px) {
    flex-direction: column;
    align-items: flex-start;
  };
  @media (max-width: 767px) {
    flex-direction: row;
  };
`

export const NavLogo = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 1127px) {
    justify-content: flex-start;
    width: 100%;
  };
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
  };
`

export const NavItems = styled.div`
  display: flex;
  flex-display: row;
  width: 80%;
  
  @media (max-width: 1127px) {
    width: 100%;
  };
`

export const NavItem = styled.p`
  color: ${ props => props.title ? '#5c5c5c' : '#a8a8a8' };
  font-size: ${ props => props.title ? '20px' : '16px' };
  font-family: ${ props => props.title ? "'Archivo Black', sans-serif !important" : "Raleway', sans-serif !important" };
  text-tranform: uppercase;
`

export const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
  border: 1px solid red;
`

export const StyledMockLink = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
  border: 1px solid red;
`