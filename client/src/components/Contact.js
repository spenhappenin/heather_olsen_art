import React from 'react';
import { StyledContainer } from '../styles/shared';
import { Container, Header } from 'semantic-ui-react';

class Contact extends React.Component {
  render() {
    return(
      <Container as={StyledContainer}>
        <Header as='h1'>Contact</Header>
      </Container>
    )
  }
}

export default Contact;