import React, { useState, useContext, useEffect, } from 'react';
import axios from 'axios';
import { FlashContext, } from "../providers/FlashProvider";
import { withRouter, } from 'react-router-dom';
import { Form, TextField, } from "./shared/Form";
import { Button, Header, StyledContainer, } from '../styles/shared';

const CategoryForm = ({ create, match, update, history, }) => {
  const [title, setTitle] = useState("");
  const [displayImage, setDisplayImage] = useState("");

  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    if (match.params.id)
      axios.get(`/api/categories/${match.params.id}`)
        .then( res => {    
          setTitle(res.data.title);
          setDisplayImage(res.data.display_image);
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();    
    match.params.id ? 
      axios.put(`/api/categories/${match.params.id}`, { title, display_image: displayImage, })
        .then( res => {
          update(res.data);
          setFlash(`${res.data.title} Updated`, "green");
          history.push('/work');
        })
        .catch( err => {
          setFlash(err.response, "red");          
        })
    : 
      axios.post('/api/categories', { title, display_image: displayImage, })
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
      <Header primary>{match.params.id ? title : "New Category"}</Header>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <TextField
          name='title'
          value={title}
          required
          label='Title'
          placeholder='Title'          
          onChange={ value => setTitle(value) }
        />
        <TextField
          name='display_image'
          value={displayImage}
          required
          label='Display Image'
          placeholder='https://some-artwork-url'
          value={displayImage}
          onChange={ value => setDisplayImage(value) }
        />
        <Button>Submit</Button>
      </Form>
    </StyledContainer>
  );
};

export default withRouter(CategoryForm);
