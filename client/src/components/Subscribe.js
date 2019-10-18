import React from "react";
import styled from "styled-components";
import { useWindowWidth, } from "./hooks/useWindowWidth";
import { Button, Header, StyledContainer, } from "../styles/shared";
import { Form, FormGroup, TextField, } from "./shared/Form";

const Subscribe = () => {
  const windowWidth = useWindowWidth();

  return (
    <SubscribeBox>
      <Header primary>Subscribe</Header>
      <p>Please enter your email to receive my newsletter about upcoming exhibitions, events, and exclusive sales</p>
      <br />
      <SubForm 
        action="https://heatherolsenart.us17.list-manage.com/subscribe/post" 
        target="_blank"
        method="POST"
        style={{ display: "flex", alignItems: "center", }}
      >
        <input type="hidden" name="u" value="d649644a1e966f199f06334bb" />
        <input type="hidden" name="id" value="1f91b5f30d" />        
        <FormGroup windowWidth={windowWidth}>
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
          <p>
            <Button 
              type="submit" 
              style={{ width: "135px", }}
            >
              Sign Up
            </Button>
          </p>    
        </FormGroup>
      </SubForm>
      <p>I respect your privacy and will only contact you with any art related news.</p>
    </SubscribeBox>
  );
};

const SubscribeBox = styled.div`
  background: #f1f0f1;
  padding: 34px 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubForm = styled(Form)`
  & > div {
    display: flex;
    align-items: center;
  }
`;

export default Subscribe;
