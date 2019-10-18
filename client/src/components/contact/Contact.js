import React from 'react';
import Copyright from '../shared/Copyright';
import ContactForm from './ContactForm';
import styled from "styled-components";
import { Header, } from '../../styles/shared';
import { StyledContainer, } from '../../styles/shared';

const Contact = () => (
  <StyledContainer>
    <Header primary>Contact</Header>
    <div>
      <Text>Heather Olsen</Text>
      <Text>SLC, UT</Text>
      <Text>801-300-5262</Text>
      <Text>heatherolsenart@gmail.com</Text>
    </div>
    <br />
    <br />
    <p>Thanks for visiting! For artwork/comission inquiries, or just to say hi, please fill out the form below. I'd love to hear from you!</p>
    <br />
    <ContactForm />
    <Copyright />
  </StyledContainer>
);

const Text = styled.p`
  margin-bottom: 0;
`;

export default Contact;