import React, { Component } from 'react';
import Copyright from './Copyright';
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
        <Copyright />
      </Segment>
    );
  }
}

export default NoMatch;
