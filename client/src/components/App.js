import React, { Component } from 'react';
import AdminArtWorks from './admin/AdminArtWorks';
import AdminCvs from './admin/AdminCvs';
import ArtWorkEditForm from './admin/ArtWorkEditForm';
import ArtWorks from './ArtWorks';
import Contact from './Contact';
import CvNewForm from './admin/CvNewForm';
import Cvs from './Cvs';
import FetchUser from './FetchUser';
import Flash from './Flash';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import ArtWorkNewForm from './admin/ArtWorkNewForm';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import { connect } from 'react-redux';
import { fetchComissions } from '../actions/comissions';
import { fetchDrawings } from '../actions/drawings';
import { fetchPaintings } from '../actions/paintings';
import { handleLogout } from '../actions/auth';
import { Link } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router-dom';
import { PropsRoute } from '../helpers/routes';
import { Menu, Sidebar } from 'semantic-ui-react';

class App extends Component {
  state = { sideNav: false, dimmed: false, logout: false };

  toggleSideNav = () => {
    const { sideNav, dimmed } = this.state;
    window.scrollTo(0, 0);
    this.setState({ sideNav: !sideNav, dimmed: !dimmed });
  }

  rightNavs = () => {
    const navs = [
      { name: 'Home', path: '/', adminPath: '/'},
      { name: 'Paintings', path: '/paintings', adminPath: '/admin-paintings' },
      { name: 'Comissions', path: '/comissions', adminPath: '/admin-comissions' },
      { name: 'Drawings', path: '/drawings', adminPath: '/admin-drawings' },
      { name: 'Cv', path: '/cv', adminPath: '/admin-cv' },
      { name: 'Contact', path: '/contact', adminPath: '/contact' },
    ]

    if(this.props.user.id) 
      navs.push({ adminName: 'Logout', logout: true });

    return navs.map(nav => {
      if(nav.logout) {
        return(
          <Menu.Item
            key={nav.name}
            name={this.props.user.id ? nav.adminName : nav.name}
            onClick={(e) => {
              this.props.dispatch(handleLogout(this.props.history));
              if (this.state.sideNav)
                 this.setState({ sideNav: false, dimmed: false });
            }}
          />
        )
      }
      return(
        <Link to={this.props.user.id ? nav.adminPath : nav.path }>
          <Menu.Item
            key={nav.path}
            position='right'
            name={nav.name}
            onClick={() => {
              if (this.state.sideNav)
                this.setState({ sideNav: false, dimmed: false });
            }}
          />
        </Link>
      )
    }
    )
  }

  render() {
    return (
      <div>
        <NavBar toggleSideNav={this.toggleSideNav} />
        <Sidebar.Pushable onClick={this.handleSidebar}>
          <Sidebar 
            as={Menu} 
            animation='overlay' 
            width='thin' 
            visible={this.state.sideNav} 
            icon='labeled' 
            direction='top' 
            vertical 
            inverted
            style={styles.sidebar}
          >
            { this.rightNavs() }
          </Sidebar>
          <Sidebar.Pusher style={styles.push} dimmed={this.state.dimmed}>
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
                <ProtectedRoute
                  exact
                  path='/admin-comissions'
                  component={AdminArtWorks}
                  fetchArtWorks={fetchComissions}
                  title='Comissions'
                  type='comission'
                />
                <ProtectedRoute exact path='/admin-comissions/new' component={ArtWorkNewForm} />            
                <ProtectedRoute
                  exact
                  path='/admin-comissions/:id'
                  component={ArtWorkEditForm}
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
                <ProtectedRoute
                  exact
                  path='/admin-paintings'
                  component={AdminArtWorks}
                  fetchArtWorks={fetchPaintings}
                  title='Paintings'
                  type='painting'
                />
                <ProtectedRoute exact path='/admin-paintings/new' component={ArtWorkNewForm} />
                <ProtectedRoute
                  exact
                  path='/admin-paintings/:id'
                  component={ArtWorkEditForm}
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
                  component={AdminArtWorks}
                  fetchArtWorks={fetchDrawings}
                  title='Drawings'
                  type='drawing'
                />
                <ProtectedRoute exact path='/admin-drawings/new' component={ArtWorkNewForm} />
                <ProtectedRoute
                  exact
                  path='/admin-drawings/:id'
                  component={ArtWorkEditForm}
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
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const styles = {
  sidebar: {
    paddingLeft: '30px !important'
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

// TODO: Find the more optimal solution instead of withRouter (see article)
export default withRouter(connect(mapStateToProps)(App));