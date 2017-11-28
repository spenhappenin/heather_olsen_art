import React, { Component } from 'react';
import AdminCvs from './admin/AdminCvs';
import ArtWorks from './ArtWorks';
import Contact from './Contact';
import CvNewForm from './admin/CvNewForm';
import Cvs from './Cvs';
import FetchUser from './FetchUser';
import Flash from './Flash';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import styled from 'styled-components';
import { fetchComissions } from '../actions/comissions';
import { fetchDrawings } from '../actions/drawings';
import { fetchPaintings } from '../actions/paintings';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { PropsRoute, renderMergedProps } from '../helpers/routes';
import { Button, Header, Icon, Image, Menu, Segment } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <PropsRoute 
              exact 
              path='/comissions' 
              component={ArtWorks} 
              fetchArtWorks={fetchComissions}
              title='Comissions'
              type='comission' 
            />
            <PropsRoute 
              exact 
              path='/paintings' 
              component={ArtWorks} 
              fetchArtWorks={fetchPaintings} 
              title='Paintings'
              type='painting'
            />
            <PropsRoute
              exact
              path='/drawings'
              component={ArtWorks}
              fetchArtWorks={fetchDrawings}
              title='Drawings'
              type='drawing'
            />
            <ProtectedRoute
              exact
              path='/admin-drawings'
              component={ArtWorks}
              fetchArtWorks={fetchDrawings}
              title='Drawings'
              type='drawing'
            />
            <ProtectedRoute exact path='/admin-cv' component={AdminCvs} />
            <ProtectedRoute exact path='/admin-cv/new' component={CvNewForm} />
            <Route exact path='/cv' component={Cvs} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;