import React from 'react';
import { StyledContainer } from '../../styles/shared';
import { Container, Form, Header, Input } from 'semantic-ui-react';

const typeOptions = [
  { key: 'award', text: 'Awards and Certificates', value: 'award' },
  { key: 'current_rep', text: 'Current Representation', value: 'current_rep' },
  { key: 'education', text: 'Education', value: 'education' },
  { key: 'festival', text: 'Festivals and Events', value: 'festival' },
  { key: 'exhibition', text: 'Juried Exhibitions', value: 'exhibition' },
]

class CvNewForm extends React.Component {
  state = { type: '' };

  handleChange = (e, { value }) => {
    this.setState({ type: value });
  }

  render() {
    const { type } = this.state
    return(
      <Container as={StyledContainer}>
        <Header as='h1'>New Cv Form</Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Select label='Type' options={typeOptions} placeholder='Awards and Certificates' onChange={this.handleChange} />
            <Form.Input label='Title' placeholder='Some Art Title' />
            <Form.Input label='Location' placeholder='Some Location' />
            <Form.Input label='Date' placeholder='Some Date' />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    )
  }
}

export default CvNewForm;