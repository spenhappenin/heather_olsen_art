import styled from 'styled-components';
import { NavLink, } from 'react-router-dom';

// --  Media Queries  --
// At 767 width, the hamburger menu needs to be rendered
// At 1127 width, the main logo starts to wrap. Consider moving the the main logo on its own line and then move items to line below
const desktop = 1127;
const mobile = 767;

//  --  Navbar  --
export const StyledNavbar = styled.div`
  align-items: center;
  background-color: #131313;
  border-top: 1px solid #dedede;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding-bottom: 30px;
  padding-top: 30px;
  position: fixed;
  width: 100%;
  z-index: 1;

  @media (max-width: ${desktop}px) {
    align-items: flex-start;
    flex-direction: column;
    padding-left: 20px;
  };
  @media (max-width: ${mobile}px) {
    align-items: center;
    flex-direction: row;
    height: 52px;
  };
`;

export const NavLogo = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;

  @media (max-width: ${desktop}px) {
    justify-content: flex-start;
    width: 100%;
  };
  @media (max-width: ${mobile}px) {
    display: flex;
    justify-content: center;
  };
`;

export const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;

  @media (max-width: ${desktop}px) {
    margin-top: 7px;
    width: 100%;
  };
`;

export const StyledLink = styled(NavLink)`
  color: ${ props => props.title ? '#787878' : '#b7b7b7'};
  display: flex;
  flex-direction: column;
  font-family: ${ props => props.title ? "'Merriweather Sans', sans-serif !important" : "'Julius Sans One', sans-serif !important" };
  font-size: ${ props => props.title ? '20px' : '13px'};
  justify-content: center;
  letter-spacing: 1px;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    color: #5f5f5f;
    transition: color 0.3s ease;
  }
`;

export const StyledMockLink = styled.span`
  color: #b7b7b7;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: 'Julius Sans One', sans-serif !important;
  font-size: 13px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;

  @media (max-width: ${mobile}px) {
    padding-left: 15px;
    padding-right: 15px;
  };

  &:hover {
    color: #5f5f5f;
    transition: color 0.3s ease;
  }
`;
