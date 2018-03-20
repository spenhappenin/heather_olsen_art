import React from 'react';
import Copyright from '../shared/Copyright';
import ReactPlayer from 'react-player';
import { Header } from '../../styles/shared';
import { Segment } from 'semantic-ui-react';
import { StyledContainer } from '../../styles/shared';

class Media extends React.Component {
  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header primary>Media</Header>
        <br />
        <br />
        <ReactPlayer url='https://www.youtube.com/watch?v=uXMq45odbps' controls width='100%' />
        <h3>Time Lapse Drawing #1</h3>
        <br />
        <br />
        <ReactPlayer url='https://www.youtube.com/watch?v=CbdRGKlnxX0' controls width='100%' />
        <h3>Life of Art by Ryan Meeks</h3>
        <p>From where she started to what continues to drive her work, this short documentary reveals a glimpse into the artist's vision.</p>
        <Copyright />
      </Segment>
    )
  }
}

export default Media;