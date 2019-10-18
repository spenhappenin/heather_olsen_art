import React, { useContext, useEffect, } from 'react';
import useForm from "./hooks/useForm";
import axios from 'axios';
import { FlashContext, } from "../providers/FlashProvider";
import { withRouter, } from 'react-router-dom';
import { Form, TextField, } from "./shared/Form";
import { Button, Header, StyledContainer, } from '../styles/shared';

const CategoryForm = ({ create, match, update, history, }) => {
  const { handleChange, handleSubmit, values, setValues, } = useForm(submit);

  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    if (match.params.id)
      axios.get(`/api/categories/${match.params.id}`)
        .then( res => {    
          setValues(res.data);
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  }, []);

  function submit(e) {
    e.preventDefault();    
    match.params.id ? 
      axios.put(`/api/categories/${match.params.id}`, { ...values, })
        .then( res => {
          update(res.data);
          setFlash(`${res.data.title} Updated`, "green");
          history.push('/work');
        })
        .catch( err => {
          setFlash(err.response, "red");          
        })
    : 
      axios.post('/api/categories', { ...values, })
        .then( res => {
          create(res.data);
          setFlash(`${res.data.title} Created`, "green");
          history.push('/work');
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  };

  return (
    <StyledContainer>
      <Header primary>New Category</Header>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <TextField
          name='title'
          value={values.title}
          required
          label='Title'
          placeholder='Title'
          onChange={handleChange}
        />
        <TextField
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
};

export default withRouter(CategoryForm);
