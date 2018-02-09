import styled from 'styled-components';
import { css } from 'styled-components'
import { Segment } from 'semantic-ui-react';

// object of screen sizes
const sizes = {
  giant: 3000,
  desktop: 1200,
  tablet: 768,
  phablet: 572,
  phone: 330
}

// creates media object to use for queries
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export const StyledContainer = styled(Segment)`
  ${ media.giant`padding: 50px 300px 100px 300px !important;`}
  ${ media.desktop`padding: 50px 160px 100px 160px !important;`}
  ${ media.tablet`padding: 50px 50px 100px 50px !important;`}
  ${ media.phablet`padding: 50px 30px 100px 30px !important;`}
  ${ media.phone`padding: 50px 20px 100px 20px !important;` }
`

export const DimmerContainer = styled.div`
  height: 100vh;
`

// --- Text ---

export const Header = styled.p`
  font-size: ${ props => props.primary ? '40px' : '25px'};
  border: none;
  margin: calc(2rem - .14285714em) 0 1rem;
  padding: 0 0;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-weight: 700;
  line-height: 1.28571429em;
  text-transform: none;
  color: rgba(0,0,0,.87);
`
