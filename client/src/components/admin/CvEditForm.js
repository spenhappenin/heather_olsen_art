import React from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { updateCv } from '../../actions/cvs';
import { Button, Form, Icon, Input } from 'semantic-ui-react';

class CvEditForm extends React.Component {
  state = { title: '', date: '', location: ''};

  componentDidMount() {
    this.setState({ title: this.props.title, date: this.props.date, location: this.props.location });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { dispatch, id } = this.props;
    const { date, location, title } = this.state;
    dispatch(updateCv({...date, location, title}, id));
    this.props.toggleEdit();
  }
 
  render() {
    switch(this.props.type) {
      case 'one':
        return(
          <Form onSubmit={this.handleSubmit}>
            <Input 
              name='title'
              value={this.state.title} 
              onChange={this.handleChange}
            />
            <Icon circular name='checkmark' size='large' color='green' onClick={this.handleSubmit} />
            <Icon circular name='cancel' size='large' color='red' onClick={this.props.toggleEdit} />
          </Form>
        )
      case 'two':
        return(
          <Form onSubmit={this.handleSubmit}>
            <Input
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Input
              name='date'
              value={this.state.date}
              onChange={this.handleChange}
            />
            <Icon circular name='checkmark' size='large' color='green' onClick={this.handleSubmit} />
            <Icon circular name='cancel' size='large' color='red' onClick={this.props.toggleEdit} />
          </Form>
        )
      case 'three':
        return(
          <Form onSubmit={this.handleSubmit}>
            <Input
              name='date'
              value={this.state.date}
              onChange={this.handleChange}
            />
            <Input
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Input
              name='location'
              value={this.state.location}
              onChange={this.handleChange}
            />
            <Icon circular name='checkmark' size='large' color='green' onClick={this.handleSubmit} />
            <Icon circular name='cancel' size='large' color='red' onClick={this.props.toggleEdit} />
          </Form>
        )
    }
  }
}

export default connect()(CvEditForm);