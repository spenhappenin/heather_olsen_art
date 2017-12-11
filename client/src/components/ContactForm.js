import React from 'react';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';

const ContactForm = () => (
  <Form action='https://formspree.io/spencer.richards7@gmail.com' method='POST'>
    <Form.Group widths='equal'>
      <Form.Field name='first-name' control={Input} label='First name' />
      <Form.Field name='last-name' control={Input} label='Last name' />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field name='email' control={Input} label='Email Address' type='email' />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field name='subject' control={Input} label='Subject' />
    </Form.Group>
    <Form.Field name='message' control={TextArea} label='Message' />
    <Form.Field control={Button} color='black' content='Submit' />
  </Form>
)

export default ContactForm;