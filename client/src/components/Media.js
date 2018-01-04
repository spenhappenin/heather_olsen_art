import React from 'react';
import Copyright from './Copyright';
import ReactPlayer from 'react-player';
import { Header, Segment } from 'semantic-ui-react';
import { StyledContainer } from '../styles/shared';

class Media extends React.Component {
  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header as='h1'>Media</Header>
        <br />
        <br />
        <ReactPlayer url='https://www.youtube.com/watch?v=CbdRGKlnxX0' controls width='100%' />
        <Header as='h3'>Some Video Title</Header>
        <p>Here is some content about the video. Some things will be said about the details of this video and will give viewers an idea of how amazing Heather's work is. Here is some content about the video. Some things will be said about the details of this video and will give viewers an idea of how amazing Heather's work is. Here is some content about the video. Some things will be said about the details of this video and will give viewers an idea of how amazing Heather's work is.</p>
        <Copyright />
      </Segment>
    )
  }
}

export default Media;