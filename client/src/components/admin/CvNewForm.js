import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { StyledContainer, } from '../../styles/shared';
import { Button, Header, } from '../../styles/shared';
import { Link, withRouter, } from 'react-router-dom';
import { Form, Icon, Segment, } from 'semantic-ui-react';

class CvNewForm extends React.Component {
  state = { date: '', location: '', cv_date: moment(), title: '', cv_type: '', };

  handleChange = (e, { name, value }) => this.setState({ [name]: value, });

  handleDateChange = (date) => this.setState({ cv_date: date, date, });

  handleSubmit = () => {
    axios.post('/api/cvs', { cv: this.state, })
      .then( res => {
        // AUTH: Add Flash
        this.props.create(res.data);
        this.props.history.push('/admin-cv');
      })
      .catch( err => {
        // AUTH: Add Flash
        console.log(err.response);
      })
  }

  render() {
    const { cv_type, title, location, } = this.state;

    return(
      <Segment as={StyledContainer} basic>
        <Header primary>New Cv Form</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Select 
              name='cv_type' 
              label='Type' 
              placeholder='Awards and Certificates' 
              options={typeOptions} 
              value={cv_type}
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
          <h5>Date</h5>
          <DatePicker
            selected={this.state.cv_date}
            onChange={this.handleDateChange}
          />
          <br />
          <Form.Group>
            <Link to='/admin-cv' rel="noopener noreferrer">
              <Button><Icon name='arrow left' />Back</Button>
            </Link>
            <Button type='submit'>Submit</Button>
          </Form.Group>
        </Form>
      </Segment>
    )
  }
}

const typeOptions = [
  { key: 'award', text: 'Awards and Certificates', value: 'award' },
  { key: 'current_rep', text: 'Current Representation', value: 'current_rep' },
  { key: 'education', text: 'Education', value: 'education' },
  { key: 'festival', text: 'Festivals and Events', value: 'festival' },
  { key: 'exhibition', text: 'Juried Exhibitions', value: 'exhibition' },
];

export default withRouter(CvNewForm);
