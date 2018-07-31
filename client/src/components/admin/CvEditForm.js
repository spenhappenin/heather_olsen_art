import React from 'react';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { updateCv, } from '../../actions/cvs';

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
      <CvButton onClick={this.handleSubmit} type='button'>Accept</CvButton>
      <CvButton onClick={this.props.toggleEdit} type='button'>Cancel</CvButton>
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
              onChange={this.handleChange}
              value={this.state.title}
            />
            <Input
              name='date'
              onChange={this.handleChange}
              type='date'
              value={this.state.date}
            />
            { this.renderButtons() }
          </Form>
        )
      case 'three':
        return(
          <Form onSubmit={this.handleSubmit}>
            <Input
              name='date'
              onChange={this.handleChange}
              required
              smaller
              type='date'
              value={this.state.date}
            />
            <Input
              name='title'
              onChange={this.handleChange}
              required
              value={this.state.title}
            />
            <Input
              name='location'
              onChange={this.handleChange}
              required
              value={this.state.location}
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
  background-color: #272727;
  border-color: #272727;
  color: #fff;
  cursor: pointer;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-left: 10px;
  padding: 10px 15px 10px 15px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #595959;
    transition: background-color 0.3s ease;
  }
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 0 0 0 0 transparent inset;
  color: rgba(0,0,0,.87);
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-size: 14px !important;
  height: 35px;
  line-height: 1.21428571em;
  margin: 0 0 5px 0;
  outline: 0;
  padding: .67857143em 1em;
  transition: color .1s ease,border-color .1s ease;
  width: ${ props => props.smaller ? '161px' : '225px' };
`;

export default connect()(CvEditForm);
