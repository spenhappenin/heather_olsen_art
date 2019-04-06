import React from 'react';
import About from './About';
import AllArtwork from './AllArtwork';
import ArtworkEdit from './ArtworkEdit';
import ArtworkNew from './ArtworkNew';
import asyncComponent from './asyncComponent';
import axios from 'axios';
import CategoryForm from './CategoryForm';
import Contact from './contact/Contact';
import FetchCvs from './FetchCvs';
import Flash from './shared/Flash';
import Login from './login/Login';
import Media from './media/Media';
import MediaForm from './media/MediaForm';
import NavBar from './shared/NavBar';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import styled from 'styled-components';
import SortArtwork from "./SortArtwork";
import AuthRoute from './AuthRoute';
// import { connect, } from 'react-redux';
import { Link, } from 'react-router-dom';
import { Menu, Sidebar, } from 'semantic-ui-react';
import { Route, Switch, withRouter, } from 'react-router-dom';

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
        this.setState({ categories: res.data, loaded: true, });
      })
      .catch( err => {
        console.log(err.response);
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
      { name: 'ABOUT', path: '/about', adminPath: '/about' },
      { name: 'CONTACT', path: '/contact', adminPath: '/contact' }
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
              // AUTH: handleLogout
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
              <Switch>
                <Route 
                  exact 
                  path='/work' 
                  render={ props => (
                    <Categories categories={this.state.categories} delete={this.deleteCategory} />
                  )} 
                />
                <ProtectedRoute exact path='/work/all' component={AllArtwork} />
                <ProtectedRoute exact path='/work/sort' component={SortArtwork} />
                {
                  this.props.user.id && 
                  <Route 
                    exact 
                    path='/work/new-category' 
                    render={ props => <CategoryForm create={this.createCategory} /> } 
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
                <Route path='/cv' component={FetchCvs} />
                <ProtectedRoute path='/admin-cv' component={FetchCvs} />
                <Route exact path='/media' component={Media} />
                <ProtectedRoute path="/media/:id/edit" component={MediaForm} />
                <ProtectedRoute path="/media/new" component={MediaForm} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <AuthRoute exact path='/login' component={Login} />
                <Route component={NoMatch} />
              </Switch>          
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

// TODO: Find the more optimal solution instead of withRouter (see article)
export default withRouter(App);
