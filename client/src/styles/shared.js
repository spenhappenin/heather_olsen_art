import styled from 'styled-components';
import { css, } from 'styled-components'
import { Link as ReactRouterLink, } from 'react-router-dom';

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
}, {});

export const StyledContainer = styled.div`
  ${ media.giant`margin: 50px 280px 125px 280px !important;`};
  ${ media.desktop`margin: 50px 100px 125px 100px !important;`};
  ${ media.tablet`margin: 50px 50px 125px 50px !important;`};
  ${ media.phablet`margin: 50px 30px 125px 30px !important;`};
  ${ media.phone`margin: 50px 20px 125px 20px !important;` };
`;

export const DimmerContainer = styled.div`
  height: 100vh;
`;

// --- Text ---

export const Header = styled.p`
  border: none;
  color: rgba(0,0,0,.87);
  font-family: 'Julius Sans One', sans-serif;
  font-size: ${ props => props.primary ? '34px' : '20px'};
  font-weight: 700;
  line-height: 1.28571429em;
  margin: calc(2rem - .14285714em) 0 1rem;
  padding: 0 0;
  text-transform: ${ props => props.primary ? 'uppercase' : 'none'};
`;

export const Link = styled(ReactRouterLink)`
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

export const SocialLink = styled(ReactRouterLink)`
  color: #4f4f4f;
  font-weight: 100;
  margin-bottom: 14px;
`;

// --- Buttons ---

export const Button = styled.button`
  background-color: ${ props => props.modal ? '#557c8c' : '#272727'};
  border-color: #272727;
  color: #fff;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-right: ${ props => props.group ? '15px' : null };
  padding: 15px 40px 15px 40px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${ props => props.modal ? '#6e92a1' : '#595959'};
    transition: background-color 0.3s ease;
  }
`;

export const CvButton = styled.button`
  color: #fff;
  cursor: pointer;
  background-color: ${ props => props.edit ? '#84764d' : '#784747'};
  border-color: #272727;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 5px 10px 5px 10px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${ props => props.modal ? '#6e92a1' : '#595959'};
    transition: background-color 0.3s ease;
  }
`;
