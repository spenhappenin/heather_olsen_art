import React from 'react';
import axios from "axios";
import Copyright from '../shared/Copyright';
import ReactPlayer from 'react-player';
import styled from "styled-components";
import { Header, } from '../../styles/shared';
import { Segment, } from 'semantic-ui-react';
import { StyledContainer, } from '../../styles/shared';
import { connect, } from "react-redux";
import { Link, } from "react-router-dom";
import { Button, } from "../../styles/shared";
import { setFlash, } from '../../actions/flash';
import { setHeaders, } from '../../actions/headers';

class Media extends React.Component {
  state = { videos: [], };

  componentDidMount() {
    axios.get("/api/videos")
      .then( res => {
        this.setState({ videos: res.data, });
        this.props.dispatch(setHeaders(res.headers));
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
        this.props.dispatch(setFlash(err.response, 'red'));
      })
  };

  renderButtons = (id) => {
    if (this.props.user.id) 
      return (
        <div>
          <Link to={`/media/${id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button>Delete</Button>
        </div>
      );
  };

  renderVideos = () => {
    return this.state.videos.map( video => {
      return (
        <VideoContainer>
          <ReactPlayer url={video.url} controls width="100%" />
          <TitleContainer>
            <h3>{ video.title }</h3>
            { this.renderButtons(video.id) }
          </TitleContainer>
          <p>{ video.body }</p>
        </VideoContainer>
      );
    });
  };

  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header primary>Media</Header>
        { 
          this.props.user.id &&
            <Link to="/media/new"><Button>New</Button></Link>
        }
        <br />
        <br />
        { this.renderVideos() }
        <Copyright />
      </Segment>
    );
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, };
}

const VideoContainer = styled.div`
  margin-bottom: 50px;
`;

const TitleContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export default connect(mapStateToProps)(Media);
