import React from 'react';
import ContactForm from './ContactForm';
import { StyledContainer, StyledHeader } from '../styles/shared';
import { Container, Header, Segment } from 'semantic-ui-react';

class Contact extends React.Component {
  render() {
    return(
      <Container as={StyledContainer}>
        <Header as={StyledHeader}>Contact</Header>
        <Segment basic>
          <p>Heather Olsen</p>
          <p>SLC, UT</p>
          <p>801-300-5262</p>
          <p>heatherolsenart@gmail.com</p>
        </Segment>
        <br />
        <br />
        <p>Thanks for visiting! For artwork/comission inquiries, or just to say hi, please fill out the form below. I'd love to hear from you!</p>
        <br />
        <ContactForm />
        <br />
        <br />
        <br />
        <p>All images and content of this website are copyrighted by the artist, Heather Olsen. Any use or reproduction in any form without permission is prohibited.</p>
      </Container>
    )
  }
}

export default Contact;