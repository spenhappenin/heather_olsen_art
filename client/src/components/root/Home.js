import React from 'react';
import MainImage from '../../images/home_page_main.jpg';
import styled from 'styled-components';
import { Transition, } from 'semantic-ui-react';

class Home extends React.Component {
  state = { modal: true, visible: false, };

  componentDidMount() {
    this.setState({ visible: !this.state.visible, });
  }

  render() {
    const { visible, } = this.state;
    return(
      <Transition visible={visible} animation='fade' duration={1300}>
        <StyledBackground url={MainImage} />
      </Transition>
    );
  };
};

export const StyledBackground = styled.div`
	background-image: ${ props => `url(${props.url})` };
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: 100%;
	height: 100vh;
`;

export default Home;
