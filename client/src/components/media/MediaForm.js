import React, { Component, } from "react";
import axios from "axios";
import { connect, } from "react-redux";
import { Form, } from 'semantic-ui-react';
import { Button, Header, StyledContainer, } from '../../styles/shared';
import { setFlash, } from '../../actions/flash';
import { setHeaders, } from '../../actions/headers';

class MediaForm extends Component {
  state = { title: "", body: "", url: "", };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/videos/", { video: {...this.state}, })
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash("Video Uploaded!", 'green'));
        this.props.history.goBack();
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
        this.props.dispatch(setFlash(err.response, 'red'));
      })
  };

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  };

  render() {
    const { title, body, url, } = this.state;

    return (
      <StyledContainer>
        <Header primary>Media New</Header>
        <br />
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="title" 
            placeholder="Title" 
            label="Title" 
            value={title}
            onChange={this.handleChange} 
          />
          <Form.Input 
            name="url" 
            placeholder="YouTube URL" 
            label="YouTube URL" 
            value={url} 
            onChange={this.handleChange}
          />
          <Form.TextArea 
            name="body" 
            placeholder="Body" 
            label="Body" 
            value={body} 
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </StyledContainer>
    );
  };
};

export default connect()(MediaForm);
