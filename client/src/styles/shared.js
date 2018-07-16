import styled from 'styled-components';
import { css, } from 'styled-components'
import { Link as ReactRouterLink, } from 'react-router-dom';
import { Segment, } from 'semantic-ui-react';

// object of screen sizes
const sizes = {
  giant: 3000,
  desktop: 1200,
  tablet: 768,
  phablet: 572,
  phone: 330
};

// creates media object to use for queries
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export const StyledContainer = styled.div`
  ${ media.giant`padding: 50px 300px 100px 300px !important;`};
  ${ media.desktop`padding: 50px 160px 100px 160px !important;`};
  ${ media.tablet`padding: 50px 50px 100px 50px !important;`};
  ${ media.phablet`padding: 50px 30px 100px 30px !important;`};
  ${ media.phone`padding: 50px 20px 100px 20px !important;` };
`;

export const DimmerContainer = styled.div`
  height: 100vh;
`;

// --- Text ---

export const Header = styled.p`
  font-size: ${ props => props.primary ? '34px' : '25px'};
  border: none;
  margin: calc(2rem - .14285714em) 0 1rem;
  padding: 0 0;
  font-family: 'Julius Sans One', sans-serif;
  font-weight: 700;
  line-height: 1.28571429em;
  color: rgba(0,0,0,.87);
  text-transform: ${ props => props.primary ? 'uppercase' : 'none'};
`;

export const Link = styled(ReactRouterLink)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

export const SocialLink = styled(ReactRouterLink)`
  margin-bottom: 14px;
  font-weight: 100;
  color: #4f4f4f;
`;

// --- Buttons ---

export const Button = styled.button`
  color: #fff;
  transition: background-color 0.3s ease;
  background-color: ${ props => props.modal ? '#557c8c' : '#272727'};
  border-color: #272727;
  padding: 15px 40px 15px 40px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 11px;
  cursor: pointer;
  margin-right: ${ props => props.group ? '15px' : null };

  &:focus {
    outline: 0;
  }
  &:hover {
    transition: background-color 0.3s ease;
    background-color: ${ props => props.modal ? '#6e92a1' : '#595959'};
  }
`;

export const CvButton = styled.button`
  color: #fff;
  transition: background-color 0.3s ease;
  background-color: ${ props => props.edit ? '#84764d' : '#784747'};
  border-color: #272727;
  padding: 5px 10px 5px 10px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 11px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
  &:hover {
    transition: background-color 0.3s ease;
    background-color: ${ props => props.modal ? '#6e92a1' : '#595959'};
  }
`;
