import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledBackground = styled.div`
	background-image: url('http://res.cloudinary.com/dtb6lx1s4/image/upload/v1485475639/HOA/orange_xcm3k5.jpg') !important;
	background-size: cover !important;
	background-repeat: no-repeat !important;
	background-position: center !important;
	width: 100% !important;
	height: 100vh !important;
`

class Home extends Component {
  render() {
    return(
      <StyledBackground>
      </StyledBackground>
    );
  }
}

export default Home;
