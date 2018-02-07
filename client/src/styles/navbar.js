import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


export const StyledMenu = styled.div`
  background-color: #131313 !important;
  border-top: 1px solid #dedede !important;
	position: fixed !important;
	bottom: 0 !important;
  height: 74px;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  z-index: 1;
  `

export const StyledMenuItem = styled.p`
  color: ${ props => props.title ? '#5c5c5c !important' : '#a8a8a8 !important' };
  font-size: ${ props => props.title ? '20px' : '16px' };
  font-family: ${ props => props.title ? "'Archivo Black', sans-serif !important" : "Raleway', sans-serif !important" };
  text-tranform: uppercase !important;
  `

// -----------------------------------------------

export const StyledNavbar = styled.div`
  background-color: #131313;
  border-top: 1px solid #dedede;
  position: fixed;
  bottom: 0;
  height: 74px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-around; */
  z-index: 1;
  `

export const StyledNavItems = styled.div`
  display: flex;
  flex-display: row;
  align-items: space-between;
`

export const StyledLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `