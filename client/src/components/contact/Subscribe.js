import React from 'react';
import { Button, Form, Header, Input, Segment } from 'semantic-ui-react';

const Subscribe = () => (
  <Segment basic>
    <Header as='h3'>Subscribe</Header>
    <p>Sign up with your email address to receive news and updates.</p>
    <Form>
      <Form.Group widths='equal'>
        <Form.Field name='first-name' control={Input} label='First name' />
        <Form.Field name='last-name' control={Input} label='Last name' />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field name='email' control={Input} label='Email Address' type='email' />
      </Form.Group>
      <Form.Field control={Button} color='black' content='Subscribe' />
    </Form>
  </Segment>
)

export default Subscribe;