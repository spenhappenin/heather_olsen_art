import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { createCv } from '../../actions/cvs';
import { Redirect } from 'react-router-dom';
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
  state = { type: '', title: '', location: '', date: '', startDate: moment(), fireRedirect: false };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleDateChange = (date) => {
    this.setState({ startDate: date, date });
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { type, title, location, date, fireRedirect } = this.state;
    dispatch(createCv({ cv_type: type, title, location, cv_date: date } ));
    this.setState({ fireRedirect: true });
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { type, title, location, date, fireRedirect } = this.state
    return(
      <Container as={StyledContainer}>
        <Header as='h1'>New Cv Form</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Select 
              name='type' 
              label='Type' 
              placeholder='Awards and Certificates' 
              options={typeOptions} 
              value={type}
              onChange={this.handleChange} 
            />
            <Form.Input 
              required
              name = 'title' 
              label='Title' 
              placeholder='Some Art Title'
              value={title} 
              onChange={this.handleChange} 
            />
            <Form.Input 
              name='location' 
              label='Location' 
              placeholder='Some Location' 
              value={location}
              onChange={this.handleChange} 
            />
          </Form.Group>
          <Header as='h5'>Date</Header>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
          />
          <br />
          <Form.Button>Submit</Form.Button>
        </Form>
        {
          fireRedirect && (
            <Redirect to={from || '/admin-cv'} />
          )
        }
      </Container>
    )
  }
}

export default connect()(CvNewForm);