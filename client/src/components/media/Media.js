import React, { useState, useEffect, useContext, } from 'react';
import axios from "axios";
import Copyright from '../shared/Copyright';
import ReactPlayer from 'react-player';
import styled from "styled-components";
import { AuthContext, } from "../../providers/AuthProvider";
import { FlashContext, } from "../../providers/FlashProvider";
import { Segment, } from 'semantic-ui-react';
import { Link, } from "react-router-dom";
import { Header, Button, StyledContainer, } from '../../styles/shared';

const Media = (props) => {
  const [videos, setVideos] = useState([]);

  const { user, } = useContext(AuthContext);
  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    axios.get("/api/videos")
      .then( res => {
        setVideos(res.data);
      })
      .catch( err => {
        setFlash(err.response, "red");
      })
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video?"))
      axios.delete(`/api/admin/videos/videos/${id}`)
        .then( res => {
          setFlash(`${res.data.title} Deleted`, "green");
          setVideos( videos => videos.filter( video => video.id !== id ));
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  }

  const renderButtons = (id) => {
    if (user)
      return (
        <div>
          <Link to={`/media/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(id)}>Delete</Button>
        </div>
      );
  };

  const renderVideos = () => {
    return videos.map( video => {
      return (
        <VideoContainer>
          <ReactPlayer url={video.url} controls width="100%" />
          <TitleContainer>
            <h3>{ video.title }</h3>
            { renderButtons(video.id) }
          </TitleContainer>
          <p>{ video.body }</p>
        </VideoContainer>
      );
    });
  };

  return (
    <Segment as={StyledContainer} basic>
      <Header primary>Media</Header>
      {
        user &&
        <Link to="/media/new"><Button>New</Button></Link>
      }
      <br />
      <br />
      { renderVideos() }
      <Copyright />
    </Segment>
  );
}

const VideoContainer = styled.div`
  margin-bottom: 50px;
`;

const TitleContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export default Media;
