import React from 'react';
import { Button, } from '../../styles/shared';
import { Form, Input, Segment, } from 'semantic-ui-react';

const Subscribe = () => (
  <Segment basic>
    <h3>Subscribe</h3>
    <p>Sign up with your email address to receive news and updates.</p>
    <Form>
      <Form.Group widths='equal'>
        <Form.Field name='first-name' control={Input} label='First name' />
        <Form.Field name='last-name' control={Input} label='Last name' />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field name='email' control={Input} label='Email Address' type='email' />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  </Segment>
)

export default Subscribe;