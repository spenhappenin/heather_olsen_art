import React, { Component } from 'react';
import { StyledContainer } from '../styles/shared';
import { Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header as='h1' textAlign='center'>
          Page Not Found
          <Link to='/'> Home</Link>
        </Header>
      </Segment>
    );
  }
}

export default NoMatch;
