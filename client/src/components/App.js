import React from 'react';
import About from './About';
import axios from 'axios';
import asyncComponent from './asyncComponent';
import AdminCvs from './admin/AdminCvs';
import Contact from './contact/Contact';
import CvNewForm from './admin/CvNewForm';
import Cvs from './cvs/Cvs';
import FetchUser from './shared/FetchUser';
import Flash from './shared/Flash';
import Login from './login/Login';
import NavBar from './shared/NavBar';
import NoMatch from './NoMatch';
import Media from './media/Media';
import ProtectedRoute from './ProtectedRoute';
// // import FetchCategories from './FetchCategories';
import { connect, } from 'react-redux';
import { handleLogout, } from '../actions/auth';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Sidebar, } from 'semantic-ui-react';
import { Route, Switch, withRouter, } from 'react-router-dom';
import ArtworkNew from './ArtworkNew';
import AllArtwork from './AllArtwork';
import CategoryForm from './CategoryForm';
import ArtworkEdit from './ArtworkEdit';
import { setHeaders, } from '../actions/headers';

const AdminArtworks = asyncComponent( () => 
  import('./AdminArtworks').then( module => module.default)
);
const Artworks = asyncComponent( () => 
  import('./Artworks').then( module => module.default)
);
const Categories = asyncComponent( () => 
  import('./Categories').then( module => module.default)
);
const Home = asyncComponent( () => 
  import('./root/Home').then( module => module.default)
);

class App extends React.Component {
  state = { dimmed: false, logout: false, sideNav: false, categories: [], loaded: false, };

  componentDidMount() {
    axios.get('/api/works')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ categories: res.data, loaded: true, });
      })
      .catch( err => {
        // TODO: Add error handling
        console.log(err.response)
      })
  };

  toggleSideNav = () => {
    const { dimmed, sideNav, } = this.state;
    
    window.scrollTo(0, 0);
    this.setState({ sideNav: !sideNav, dimmed: !dimmed, });
  };

  closeSideNav = () => this.setState({ sideNav: false, dimmed: false, });

  createCategory = (category) => {
    this.setState({ categories: [...this.state.categories, category] });
  };

  updateCategory = (category) => {
    let categories = this.state.categories.map( c => {
      if (c.id === category.id)
        return c = category
      return c;
    })
    this.setState({ categories, });
  };

  deleteCategory = (id) => {
    const categories = this.state.categories.filter( c => c.id !== id)
    this.setState({ categories, });
  };

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
                <ProtectedRoute exact path='/work/all' component={AllArtwork} />
                <Route 
                  exact 
                  path='/work' 
                  render={ props => (
                    <Categories categories={this.state.categories} delete={this.deleteCategory} />
                  )} 
                />
                {
                  this.props.user.id && 
                  <Route 
                    exact 
                    path='/work/new-category' 
                    render={ props => (
                      <CategoryForm 
                        create={this.createCategory}
                        update={this.updateCategory} 
                      />
                    )} 
                  />
                }
                {
                  this.props.user.id && 
                  <Route 
                    exact 
                    path='/work/edit-category/:id'
                    render={ props => (
                      <CategoryForm 
                        create={this.createCategory}
                        update={this.updateCategory} 
                        delete={this.deleteCategory}
                      />
                    )} 
                  />
                }
                {
                  this.props.user.id ?
                    <ProtectedRoute exact path='/work/:work_title' component={AdminArtworks} />
                  :
                    <Route exact path='/work/:work_title' component={Artworks} />
                }
                <ProtectedRoute exact path='/work/:work_title/new' component={ArtworkNew} />
                <ProtectedRoute exact path='/work/edit/:id' component={ArtworkEdit} />
                <ProtectedRoute exact path='/admin-cv' component={AdminCvs} />
                <ProtectedRoute exact path='/admin-cv/new' component={CvNewForm} />
                <Route exact path='/cv' component={Cvs} />
                <Route exact path='/media' component={Media} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/' component={Home} />
                <Route exact path='/about' render={ props => <About user={this.props.user} />} />
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
