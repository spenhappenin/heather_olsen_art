import styled from 'styled-components';
import { css } from 'styled-components'
import { Container, Header, Segment } from 'semantic-ui-react';

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

export const StyledHeader = styled(Header)`
  font-size: 40px !important;
`

export const CenteredSegment = styled.div`
  display: flex !important,
  justify-content: center !important,
  align-items: center !important
`
