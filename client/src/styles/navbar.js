import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

export const StyledMenu = styled(Menu)`
  background-color: #131313 !important;
	position: fixed !important;
	bottom: 0 !important;
  height: 74px;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  z-index: 1;
`

export const StyledMenuItem = styled(Menu.Item)`
  color: #a8a8a8 !important;
  font-size: 16px;
  font-family: 'Raleway', sans-serif !important;
  text-tranform: uppercase !important;
`