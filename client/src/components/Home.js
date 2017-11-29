import React, { Component } from 'react';
import styled from 'styled-components';

class Home extends Component {
  render() {
    return(
      <StyledBackground>
      </StyledBackground>
    );
  }
}

const StyledBackground = styled.div`
	background-image: url('http://res.cloudinary.com/dtb6lx1s4/image/upload/v1502990616/10x10_300_dpi_qrvim8.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: 100% !important;
	height: 100vh !important;
`

export default Home;
