import React from 'react';
import AdminCvs from './admin/AdminCvs';
import Contact from './contact/Contact';
import CvNewForm from './admin/CvNewForm';
import Cvs from './cvs/Cvs';
import FetchDrawings from './artWorks/FetchDrawings';
import FetchComissions from './artWorks/FetchComissions';
import FetchPaintings from './artWorks/FetchPaintings';
import FetchUser from './shared/FetchUser';
import Flash from './shared/Flash';
import Home from './root/Home';
import Login from './login/Login';
import NavBar from './shared/NavBar';
import NoMatch from './NoMatch';
import Media from './media/Media';
import ProtectedRoute from './ProtectedRoute';
import ShowArtWorks from './ShowArtWorks';
import FetchCategories from './FetchCategories';
import { connect, } from 'react-redux';
import { fetchComissions, } from '../actions/comissions';
import { fetchDrawings, } from '../actions/drawings';
import { fetchPaintings, } from '../actions/paintings';
import { handleLogout, } from '../actions/auth';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Sidebar, } from 'semantic-ui-react';
import { Route, Switch, withRouter, } from 'react-router-dom';

class App extends React.Component {
  state = { dimmed: false, logout: false, sideNav: false, };

  toggleSideNav = () => {
    const { dimmed, sideNav, } = this.state;
    
    window.scrollTo(0, 0);
    this.setState({ sideNav: !sideNav, dimmed: !dimmed, });
  };

  closeSideNav = () => this.setState({ sideNav: false, dimmed: false, });

  rightNavs = () => {
    const navs = [
      { name: 'HOME', path: '/', adminPath: '/'},
      { name: 'ARTWORK', path: '/work', adminPath: '/work' },
      { name: 'CV', path: '/cv', adminPath: '/admin-cv' },
      { name: 'MEDIA', path: '/media', adminPath: '/media' },
      { name: 'CONTACT', path: '/contact', adminPath: '/contact' },
    ];

    // If user id then add the logout link
    if(this.props.user.id) 
      navs.push({ adminName: 'LOGOUT', logout: true });

    return navs.map( nav => {
      if(nav.logout) {
        return(
          <SidebarItem
            key={nav.adminName}
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
        <SidebarItem
          as={Link}
          key={nav.name}
          to={this.props.user.id ? nav.adminPath : nav.path}
          rel="noopener noreferrer"
          position='right'
          name={nav.name}
          onClick={() => {
            if (this.state.sideNav)
              this.setState({ sideNav: false, dimmed: false });
          }}
        />
      )
    }
    )
  };

  render() {
    return (
      <div>
        <NavBar toggleSideNav={this.toggleSideNav} closeSideNav={this.closeSideNav} />
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
            style={{ paddingLeft: '30px !important' }}
          >
            { this.rightNavs() }
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.dimmed}>
            <Flash />
            <FetchUser>
              <Switch>
                <ProtectedRoute exact path='/admin-cv' component={AdminCvs} />
                <ProtectedRoute exact path='/admin-cv/new' component={CvNewForm} />
                <Route path='/work' component={FetchCategories} />
                <Route exact path='/cv' component={Cvs} />
                <Route exact path='/media' component={Media} />
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
  };
};

const SidebarItem = styled(Menu.Item)`
  color: #b7b7b7 !important;
  font-family: 'Julius Sans One', sans-serif !important;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
`;

const mapStateToProps = (state) => {
  return { user: state.user };
};

// TODO: Find the more optimal solution instead of withRouter (see article)
export default withRouter(connect(mapStateToProps)(App));
