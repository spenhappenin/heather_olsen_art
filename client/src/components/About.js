import React, { useState, useEffect, useCallback, useContext, } from "react";
import axios from "axios";
import Loader from "./Loader";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { AuthContext, } from "../providers/AuthProvider"; 
import { FlashContext, } from "../providers/FlashProvider";
import { generateImageUrl, } from "../helpers/artwork";
import { StyledDropzone, } from "../styles/artWork";
import { useDropzone, } from "react-dropzone";
import { Form, Responsive, } from "semantic-ui-react";
import { Button, Header, StyledContainer, } from "../styles/shared";

const About = (props) => {
  const [artist_statement, setArtistStatement] = useState("");
  const [bio, setBio] = useState("");
  const [fileData, setFileData] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const { setUser, user, } = useContext(AuthContext);
  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    axios.get("/api/users/1")
      .then( res => {
        const { data: { artist_statement, bio, image, }, } = res;
        setArtistStatement(artist_statement);
        setBio(bio);
        setImage(image);
      })
      .catch( err => {
        setFlash(err.response, "red");
      })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    let data = new FormData();
    let photo = fileData;
    data.append(photo.name, photo);
    data.append("bio", bio);
    data.append("artist_statement", artist_statement);
    axios.put("/api/users/1", data)
      .then( res => {        
        setUser(res.data);
        setLoader(false);
        setFlash("Profile Updated!", "green");
        window.scrollTo(0, 0);
      })
      .catch( err => {
        setFlash(err.response, "red");
      })
  };

  const onDrop = useCallback(acceptedFiles => {
    setFileUploading(!fileUploading);
    setFileData(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, });

  return (
    <StyledContainer>
      <Header primary>About</Header>
      { loader && <Loader /> }
      <br />
      <br />
      {
        user ?
          <Form onSubmit={handleSubmit}>
            <Header>Image</Header>
            <div style={{ display: "flex", }}>
              <StyledDropzone {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop the files here ...</p>
                  :
                    <span textAlign="center">Drag photo here or click to select a file.</span>
                }
              </StyledDropzone>
              <Image src={image === null ? "" : generateImageUrl(user.image, 750)} />
            </div>
            <br />
            <Form.Field>
              <Header>Bio</Header>
              <ReactQuill
                modules={{ toolbar, }}
                value={bio}
                onChange={ value => setBio(value) }
              />
            </Form.Field>
            <Form.Field>
              <Header>Artist Statement</Header>
              <ReactQuill
                modules={{ toolbar, }}
                value={artist_statement}
                onChange={ value => setArtistStatement(value) }
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
          :
          <div>
            <BioContainer>
              <Responsive maxWidth={749}>
                <Image src={image === null ? "" : generateImageUrl(image, 750)} client />
              </Responsive>
              <p dangerouslySetInnerHTML={createMarkup(bio)} />
              <Responsive minWidth={750}>
                <Image src={image === null ? "" : generateImageUrl(image, 750)} client />
              </Responsive>
            </BioContainer>
            <br />
            <br />
            <br />
            <br />
            <Header style={{ fontSize: "22px", }}>Artist Statement</Header>
            <p dangerouslySetInnerHTML={createMarkup(artist_statement)} />
          </div>
      }
    </StyledContainer>
  );
};

const createMarkup = (html) => {
  return { __html: html };
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

const Image = styled.div`
  background-image: ${ props => `url(${props.src})` };
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 350px; 
  margin-left: ${ props => props.client ? "50px" : "100px" };
  width: 350px;

  @media (max-width: 749px) {
    height: 500px;
    margin-left: 0;
    width: 100%;
  };
`;

const BioContainer = styled.div`
  display: flex;

  @media (max-width: 749px) {
    flex-direction: column;
  };
`;

export default About;
