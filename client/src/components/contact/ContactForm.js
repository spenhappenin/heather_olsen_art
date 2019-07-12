import React from 'react';
import styled from "styled-components";
import { Button, } from '../../styles/shared';
import { Form, } from 'semantic-ui-react';

const ContactForm = () => (
  <Form action='https://formspree.io/heatherolsenart@gmail.com' target="_blank" method='POST'>
    <Form.Group widths='equal'>
      <Form.Field required>
        <label htmlFor='firstname'>First Name</label>
        <Input type='text' name='firstname' id='firstname' />
      </Form.Field>
      <Form.Field required>
        <label htmlFor='lastname'>Last Name</label>
        <Input type='text' name='lastname' id='lastname' />
      </Form.Field>
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field required>
        <label htmlFor='email'>Email</label>
        <Input type='email' name='email' id='email' />
      </Form.Field>
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field required>
        <label htmlFor='subject'>Subject</label>
        <Input type='text' name='subject' id='subject' />
      </Form.Field>
    </Form.Group>
    <Form.Field required>
      <label htmlFor='message'>Message</label>
      <Form.TextArea type='textareas' name='message' id='message' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
);

const Input = styled.input`
  outline: none !important;
`;

export default ContactForm;
