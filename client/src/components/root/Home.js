import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class Home extends Component {
  state = { modal: true };

  closeModal = () => {
    const { modal } = this.state;
    this.setState({ modal: false });
  }

  render() {
    return(
      <div>
        <Modal defaultOpen={true} open={this.state.modal} basic size='small'>
          <Header as='h1' icon='smile' content='We are currently redesigning BUT we are open!' />
          <Modal.Content>
            <Header as='h3' inverted>Please feel free to checkout all the artwork and the website should be complete as soon as possible. We apologize for the inconvenience! </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button size='huge' color='blue' inverted onClick={this.closeModal}>
              <Icon name='thumbs outline up' /> Okay
            </Button>
          </Modal.Actions>
        </Modal>
        <StyledBackground></StyledBackground>
      </div>
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
