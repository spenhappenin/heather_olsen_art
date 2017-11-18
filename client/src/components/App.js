import React, { Component } from 'react';
import Comissions from './Comissions';
import FetchUser from './FetchUser';
import Flash from './Flash';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Button, Header, Icon, Image, Menu, Segment } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/comissions' component={Comissions}/>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;