import React from 'react';
import Copyright from '../shared/Copyright';
import ContactForm from './ContactForm';
import { Header } from '../../styles/shared';
import { StyledContainer } from '../../styles/shared';
import { Segment } from 'semantic-ui-react';

class Contact extends React.Component {
  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header primary>Contact</Header>
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
        <Copyright />
      </Segment>
    )
  }
}

export default Contact;