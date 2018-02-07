import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledBackground } from '../../styles/home';
import { Button, Header, Icon, Modal, Transition } from 'semantic-ui-react';

class Home extends Component {
  state = { modal: true, visible: false };

  componentDidMount() {
    this.setState({ visible: !this.state.visible });
  }

  closeModal = () => {
    const { modal } = this.state;
    this.setState({ modal: false });
  }

  toggleVisibility = () => { this.setState({ visible: !this.state.visible }) };

  render() {
    return(
      <div>
        {/* <Modal defaultOpen={true} open={this.state.modal} basic size='small'>
          <Header as='h1' icon='smile' content='We are currently redesigning BUT we are open!' />
          <Modal.Content>
            <Header as='h3' inverted>Please feel free to checkout all the artwork and the website should be complete as soon as possible. We apologize for the inconvenience! </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button size='huge' color='blue' inverted onClick={this.closeModal}>
              <Icon name='thumbs outline up' /> Okay
            </Button>
          </Modal.Actions>
        </Modal> */}
        <Transition visible={this.state.visible} animation='fade' duration={2500}>
          <StyledBackground></StyledBackground>
        </Transition>
      </div>
    );
  }
}

export default Home;
