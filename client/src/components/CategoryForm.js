import React, { useState, useContext, useEffect, } from 'react';
import axios from 'axios';
import { Checkbox, } from "semantic-ui-react";
import { FlashContext, } from "../providers/FlashProvider";
import { withRouter, } from 'react-router-dom';
import { Form, TextField, } from "./shared/Form";
import { Button, Header, StyledContainer, } from '../styles/shared';

const CategoryForm = ({ match, history, }) => {
  const [oldTitle, setOldTitle] = useState("");
  const [title, setTitle] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [published, setPublished] = useState(false);

  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    if (match.params.id)
      axios.get(`/api/categories/${match.params.id}`)
        .then( res => {    
          setTitle(res.data.title);
          setOldTitle(res.data.title);
          setDisplayImage(res.data.display_image);
          setPublished(res.data.published);
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();    
    match.params.id ? 
      axios.put(`/api/admin/categories/categories/${match.params.id}`, { title, display_image: displayImage, published, })
        .then( res => {
          setFlash(`${res.data.title} Updated`, "green");
          history.push('/work');
        })
        .catch( err => {
          setFlash(err.response, "red");          
        })
    : 
      axios.post("/api/admin/categories/categories", { title, display_image: displayImage, published, })
        .then( res => {
          setFlash(`${res.data.title} Created`, "green");
          history.push('/work');
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  };

  return (
    <StyledContainer>
      <Header primary>{match.params.id ? oldTitle : "New Category"}</Header>
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
        <Checkbox 
          label="Published"
          name="published"
          checked={published}
          onChange={(e, { checked, }) => setPublished(checked)}
        />
        <br />
        <br />
        <Button>Submit</Button>
      </Form>
    </StyledContainer>
  );
};

export default withRouter(CategoryForm);
