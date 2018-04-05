import React from 'react';
import Copyright from './shared/Copyright';
import { Link, } from 'react-router-dom';
import { StyledContainer, } from '../styles/shared';
import { Header, Segment, } from 'semantic-ui-react';

class NoMatch extends React.Component {
  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header as='h1' textAlign='center'>
          Page Not Found
          <Link to='/' rel="noopener noreferrer"> Home</Link>
        </Header>
        <Copyright />
      </Segment>
    );
  }
}

export default NoMatch;
