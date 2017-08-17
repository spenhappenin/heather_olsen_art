import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledBackground = styled.div`
	background-image: url('http://res.cloudinary.com/dtb6lx1s4/image/upload/v1502990616/10x10_300_dpi_qrvim8.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
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
