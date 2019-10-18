import React from "react";
import { Button, } from "../../styles/shared";
import { useWindowWidth, } from "../hooks/useWindowWidth";
import { Form, FormGroup, TextField, TextArea, } from "../shared/Form";

const ContactForm = () => {
  const windowWidth = useWindowWidth();

  return (
    <Form action="https://formspree.io/heatherolsenart@gmail.com" target="_blank" method="POST">
      <FormGroup windowWidth={windowWidth}>
        <TextField type="text" name="firstname" label="First Name" required />
        <TextField type="text" name="lastname" label="Last Name" required />
      </FormGroup>
      <TextField type="email" name="email" label="Email" required />
      <TextField type="text" name="subject" label="Subject" required />
      <TextArea type="textarea" name="message" label="Message" required height={150} />
      <br />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ContactForm;
