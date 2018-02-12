import React from 'react';
import { Button } from '../../styles/shared';
import { Form, Input, TextArea } from 'semantic-ui-react';

const ContactForm = () => (
  <Form action='https://formspree.io/heatherolsenart@gmail.com' target="_blank" method='POST'>
    <Form.Group widths='equal'>
      <Form.Field required name='first-name' control={Input} label='First name' />
      <Form.Field required name='last-name' control={Input} label='Last name' />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field required name='email' control={Input} label='Email Address' type='email' />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field required name='subject' control={Input} label='Subject' />
    </Form.Group>
    <Form.Field required name='message' control={TextArea} label='Message' />
    <Button type='submit'>Submit</Button>
  </Form>
)

export default ContactForm;