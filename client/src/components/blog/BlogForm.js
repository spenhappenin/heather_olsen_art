import React, { useCallback, useContext, useEffect, useState, } from "react";
import axios from "axios";
import Loader from "../Loader";
import ReactQuill from "react-quill";
import { FlashContext, } from "../../providers/FlashProvider";
import { Form, } from "semantic-ui-react";
import { StyledDropzone, } from "../../styles/artWork";
import { useDropzone, } from "react-dropzone";
import { Button, Header, StyledContainer, } from "../../styles/shared";

const BlogForm = ({ history, match, }) => {
  const [ title, setTitle, ] = useState("");
  const [ body, setBody, ] = useState("");
  const [ image, setImage, ] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [loader, setLoader] = useState(false);

  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    if (match.params.id) 
      axios.get(`/api/blogs/${match.params.id}`)
        .then( res => {
          setTitle(res.data.title);
          setBody(res.data.body);
          setImage(res.data.image);
        })
        .catch( err => {
          console.log(err);
        })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    let data = new FormData();
    let photo = image;
    data.append(photo.name, photo);
    data.append("title", title);
    data.append("body", body);

    if (match.params.id)
      axios.put(`/api/blogs/${match.params.id}`, { title, body, })
        .then( res => {
          setFlash("Artwork Updated!", "green");
          setLoader(false);
          history.goBack();
        })
        .catch( err => {
          setFlash(err.response, "red");
        }) 
    else
      axios.post("/api/blogs", data)
        .then( res => {
          setFlash("Artwork Created!", "green");
          setLoader(false);
          history.goBack();
        })
        .catch( err => {
          setFlash(err.response, "red");
        })  
  };

  const onDrop = useCallback(acceptedFiles => {
    setFileUploading(!fileUploading);
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, });

  return (
    <StyledContainer>
      { loader && <Loader /> }
      <Header primary>
        { match.params.id ? "Edit Blog Post" : "New Blog Post" }
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input 
          placeholder="Title"
          label="Title"
          value={title}
          onChange={ e => setTitle(e.target.value) }
          required
        />
        <br />
        <StyledDropzone {...getRootProps()} small>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p>
            :
              <span textAlign="center">Drag photo here or click to select a file.</span>
          }
        </StyledDropzone>
        <Header>Body</Header>
        <ReactQuill
          modules={{ toolbar, }}
          value={body}
          onChange={ value => setBody(value)}
          style={{ height: "300px", }}
        />
        <br />
        <br />
        <br />
        <br />
        <Button type="submit">Submit</Button>
      </Form>
    </StyledContainer>
  );
};

const toolbar = [
  ["bold", "italic", "underline"],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["link"]
];

export default BlogForm;
