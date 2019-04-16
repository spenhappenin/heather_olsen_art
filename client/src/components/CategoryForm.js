import React, { useEffect, } from 'react';
import useForm from "./hooks/useForm";
import axios from 'axios';
import { Form, } from 'semantic-ui-react';
import { withRouter, } from 'react-router-dom';
import { Button, Header, StyledContainer, } from '../styles/shared';

const CategoryForm = (props) => {
  const { handleChange, handleSubmit, values, setValues, } = useForm(submit);

  useEffect( () => {
    if (props.match.params.id)
      axios.get(`/api/single_category/${props.match.params.id}`)
        .then( res => {         
          setValues(res.data);
        })
        .catch( err => {
          // AUTH: Add Flash
          console.log(err.response);
        })
  }, [])

  function submit(e) {
    e.preventDefault();    
    props.match.params.id ? 
      axios.put(`/api/categories/${props.match.params.id}`, { ...values, })
        .then( res => {
          props.update(res.data);
          // AUTH: Add Flash
          props.history.push('/work');
        })
        .catch( err => {
          // AUTH: Add Flash
          console.log(err.response);
        })
    : 
      axios.post('/api/categories', { ...values, })
        .then( res => {
          props.create(res.data);
          // AUTH: Add Flash
          props.history.push('/work');
        })
        .catch( err => {
          // AUTH: Add Flash
          console.log(err.response);
        })
  };

  return (
    <StyledContainer>
      <Header primary>New Category</Header>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name='title'
          value={values.title}
          required
          label='Title'
          placeholder='Title'
          onChange={handleChange}
        />
        <Form.Input
          name='display_image'
          value={values.display_image}
          required
          label='Display Image'
          placeholder='https://some-artwork-url'
          onChange={handleChange}
        />
        <Button>Submit</Button>
      </Form>
    </StyledContainer>
  );
}

export default withRouter(CategoryForm);
