import React from 'react';
import { StyledBackground, } from '../../styles/home';
import { Transition, } from 'semantic-ui-react';

class Home extends React.Component {
  state = { modal: true, visible: false };

  componentDidMount() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;
    return(
      <Transition visible={visible} animation='fade' duration={1300}>
        <StyledBackground></StyledBackground>
      </Transition>
    );
  }
}

export default Home;
