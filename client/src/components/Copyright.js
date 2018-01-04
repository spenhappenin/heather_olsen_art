import React from 'react';
import { CopyrightSegment } from '../styles/copyright';
import { Segment } from 'semantic-ui-react';

const Copyright = () => (
  <Segment as={CopyrightSegment} basic>
    <p>All images and content of this website are copyrighted by the artist, Heather Olsen. Any use or reproduction in any form without permission is prohibited.</p>
  </Segment>
)

export default Copyright;