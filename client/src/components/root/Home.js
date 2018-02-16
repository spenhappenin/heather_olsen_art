import React, { Component } from 'react';
import { StyledBackground } from '../../styles/home';
import { Transition } from 'semantic-ui-react';

class Home extends Component {
  state = { modal: true, visible: false };

  componentDidMount() {
    this.setState({ visible: !this.state.visible });
  }

  closeModal = () => this.setState({ modal: false });

  toggleVisibility = () => { this.setState({ visible: !this.state.visible }) };

  render() {
    return(
      <div visible={this.state.visible} animation='fade' duration={2500}>
          <StyledBackground></StyledBackground>>
      </div>
    );
  }
}

export default Home;
