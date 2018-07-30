import React from 'react';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { updateCv, } from '../../actions/cvs';
import { Form, Input, } from 'semantic-ui-react';

class CvEditForm extends React.Component {
  state = { date: '', location: '', title: '', };

  componentDidMount() {
    const { date, location, title, } = this.props;
    this.setState({ title, date, location, });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatch, id, } = this.props;
    const { date, location, title, } = this.state;
    dispatch(updateCv({cv_date: date, location, title}, id));
    this.props.toggleEdit();
  };

  renderButtons = () => (
    <span>
      <CvButton onClick={this.handleSubmit}>Accept</CvButton>
      <CvButton onClick={this.props.toggleEdit}>Cancel</CvButton>
    </span>
  );
 
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
            { this.renderButtons() }
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
              type='date'
              value={this.state.date}
              onChange={this.handleChange}
            />
            { this.renderButtons() }
          </Form>
        )
      case 'three':
        return(
          <Form onSubmit={this.handleSubmit}>
            <Input
              required
              name='date'
              type='date'
              value={this.state.date}
              onChange={this.handleChange}
            />
            <Input
              required
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Input
              required
              name='location'
              value={this.state.location}
              onChange={this.handleChange}
            />
            { this.renderButtons() }
          </Form>
        )
      default: 
        return null;
    };
  };
};

const CvButton = styled.button`
  color: #fff;
  transition: background-color 0.3s ease;
  background-color: #272727;
  border-color: #272727;
  padding: 10px 15px 10px 15px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 8px;
  cursor: pointer;
  margin-right: 15px;

  &:focus {
    outline: 0;
  }
  &:hover {
    transition: background-color 0.3s ease;
    background-color: #595959;
  }
`;

export default connect()(CvEditForm);