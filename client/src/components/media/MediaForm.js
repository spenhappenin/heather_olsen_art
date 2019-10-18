import React, { useContext, useEffect, useState, } from "react";
import axios from "axios";
import { Form, TextField, TextArea, } from "../shared/Form";
import { FlashContext, } from "../../providers/FlashProvider";
import { Button, Header, StyledContainer, } from '../../styles/shared';

const MediaForm =  ({ history, match, }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");

  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    if (match.params.id)
      axios.get(`/api/videos/${match.params.id}`)
        .then( ({ data: { title, body, url } }) => {
          setTitle(title);
          setBody(body);
          setUrl(url);
        })
        .catch( err => {
          setFlash(err.response);
        })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (match.params.id) {
      axios.put(`/api/videos/${match.params.id}`, { video: { title, body, url }, })
        .then( res => {
          setFlash(`${res.data.title} Updated`, "green");
          history.goBack();
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
    } else {
      axios.post("/api/videos/", { video: { title, body, url }, })
        .then( res => {
          setFlash(`${res.data.title} Uploaded`, "green");
          history.goBack();
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
    };
  };

  return (
    <StyledContainer>
      <Header primary>{match.params.id ? "Media Edit" : "Media New"}</Header>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <TextField
          name="title"
          placeholder="Title"
          label="Title"
          value={title}
          onChange={ e => setTitle(e.target.value)}
        />
        <TextField
          name="url"
          placeholder="YouTube URL"
          label="YouTube URL"
          value={url}
          onChange={ e => setUrl(e.target.value) }
        />
        <TextArea
          name="body"
          placeholder="Body"
          label="Body"
          value={body}
          onChange={ e => setBody(e.target.value) }
          height={250}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </StyledContainer>
  );
};

export default MediaForm;
