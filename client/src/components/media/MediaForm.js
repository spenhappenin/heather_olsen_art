import React from "react";
import axios from "axios";
import { Form, } from 'semantic-ui-react';
import { Button, Header, StyledContainer, } from '../../styles/shared';

class MediaForm extends React.Component {
  state = { title: "", body: "", url: "", };

  componentDidMount() {
    const { params, } = this.props.match;
    if (params.id) 
      axios.get(`/api/videos/${params.id}`)
        .then( res => {
          const { title, body, url, } = res.data;
          this.setState({ title, body, url, });
        })
        .catch( err => {
          // AUTH: Add Flash
          console.log(err.response);
        })
  };

  handleSubmit = (e) => {
    const { params, } = this.props.match;
    e.preventDefault();
    if (params.id) {
      axios.put(`/api/videos/${params.id}`, { video: { ...this.state }, })
        .then( res => {
          // AUTH: Add Flash
          this.props.history.goBack();
        })
        .catch( err => {
          // AUTH: Add Flash
          console.log(err.response);
        })
    } else {
      axios.post("/api/videos/", { video: { ...this.state }, })
        .then( res => {
          // AUTH: Add Flash
          this.props.history.goBack();
        })
        .catch(err => {
          // AUTH: Add Flash
          console.log(err.response);
        })
    }
  };

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  };

  render() {
    const { params, } = this.props.match;
    const { title, body, url, } = this.state;

    return (
      <StyledContainer>
        <Header primary>{params.id ? "Media Edit" : "Media New"}</Header>
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

export default MediaForm;
