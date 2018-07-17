import React from 'react';
import axios from 'axios';
import { Redirect, withRouter, } from 'react-router-dom';
import { Form, } from 'semantic-ui-react';
import { Button, Header, StyledContainer, } from '../styles/shared';

class CategoryForm extends React.Component {
  state = { title: '', display_image: '', };

  componentDidMount() {
    if (this.props.match.params.id) 
    axios.get(`/api/single_category/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ title: res.data.title, display_image: res.data.display_image, });
      })
      .catch( err => {
        // TODO: Error handling
        console.log('Error...');
      })
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (e) => {
    const { match: { params }, } = this.props;
    
    e.preventDefault();
    params.id ? 
      axios.put(`/api/categories/${params.id}`, { ...this.state, })
        .then( res => {
          this.props.update(res.data)
          this.props.history.push('/work');
        })
        .catch( err => {
          // TODO: Error handling
          console.log('Error...');
        })
    : 
      axios.post('/api/categories', { ...this.state, })
        .then( res => {
          this.props.create(res.data)
          this.props.history.push('/work');
        })
        .catch( err => {
          // TODO: Error handling
          console.log('Error...');
        })
  };

  render() {
    const { display_image, title, } = this.state;

    return(
      <StyledContainer>
        <Header primary>New Category</Header>
        <br />
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input 
            name='title'
            value={title}
            required
            label='Title'
            placeholder='Title'
            onChange={this.handleChange}
          />
          <Form.Input 
            name='display_image'
            value={display_image}
            required
            label='Display Image'
            placeholder='https://some-artwork-url'
            onChange={this.handleChange}
          />
          <Button>Submit</Button>
        </Form>
      </StyledContainer>
    );
  };
};

// TODO: Why am I needing to do this? Without it, the component did mount doesn't have  `props.match...`
export default withRouter(CategoryForm);
