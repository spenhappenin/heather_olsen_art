import React from "react";
import { Button, Header, StyledContainer, } from "../styles/shared";
import { Form, TextField, } from "./shared/Form";

const Subscribe = () => {
  return (
    <StyledContainer>
      <Header primary>Subscribe</Header>
      <Form 
        action="https://heatherolsenart.us17.list-manage.com/subscribe/post" 
        target="_blank"
        method="POST"
      >
        <input type="hidden" name="u" value="d649644a1e966f199f06334bb" />
        <input type="hidden" name="id" value="1f91b5f30d" />        
        <TextField           
          label="Email"
          type="email" 
          name="MERGE0" 
          id="MERGE0" 
          size="25" 
        />                
        <TextField 
          label="First Name"
          type="text" 
          name="MERGE1" 
          id="MERGE1" 
          size="25" 
        />                
        <TextField 
          label="Last Name"
          type="text" 
          name="MERGE2" 
          id="MERGE2" 
          size="25" 
        />        
        <Button type="submit">Submit</Button>
      </Form>
    </StyledContainer>
  );
};

export default Subscribe;
