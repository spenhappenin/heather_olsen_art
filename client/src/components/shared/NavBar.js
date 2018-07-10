import React from 'react';
import { connect, } from 'react-redux';
import { handleLogout, } from '../../actions/auth';
import { Icon, } from 'semantic-ui-react';
import { withRouter, } from 'react-router-dom';
import { NavItems, NavLogo, StyledLink, StyledMockLink, StyledNavbar, } from '../../styles/navbar';

class NavBar extends React.Component {
  state = { windowWidth: window.innerWidth, };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  };
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  };

  handleResize = (e) => this.setState({ windowWidth: window.innerWidth });

  showLogout = () => {
    const { dispatch, history, user, } = this.props;

    if(user.id) {
      return(
        <StyledMockLink 
          onClick={ () => dispatch(handleLogout(history)) } 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          LOGOUT
        </StyledMockLink>
      )
    };
  };

  displayRoutes = () => {
    const { id, } = this.props.user;

    const links = [
      { route: '/work', adminRoute: '/work', text: 'ARTWORK', },
      // { route: '/paintings', adminRoute: '/admin-paintings', text: 'PAINTINGS', },
      // { route: '/drawings', adminRoute: '/admin-drawings', text: 'DRAWINGS', },
      // { route: '/comissions', adminRoute: '/admin-comissions', text: 'COMISSIONS', },
      { route: '/cv', adminRoute: '/admin-cv', text: 'CV', },
      { route: '/media', adminRoute: '/media', text: 'MEDIA', },
      { route: '/contact', adminRoute: '/contact', text: 'CONTACT', }
    ];

    return links.map( link => {
      return (
        <StyledLink
          to={id ? link.adminRoute : link.route}
          activeStyle={{ color: '#525252' }}
          className='nav-link'
          rel="noopener noreferrer"
        >
          { link.text }
        </StyledLink>
      )
    });
  };

  render() {
    const { windowWidth, } = this.state;

    if(windowWidth <= 767) {
      return(
        <StyledNavbar mobile>
          <Icon
            name='sidebar'
            size='large'
            onClick={this.props.toggleSideNav}
            inverted
            color='grey'
          />
          <NavLogo>
            <StyledLink to='/' title rel="noopener noreferrer">
              HEATHER OLSEN ART
            </StyledLink>
          </NavLogo>
        </StyledNavbar>
      )
    } else {
      return (
        <div>
          <StyledNavbar>
            <NavLogo>
              <StyledLink to='/' title rel="noopener noreferrer">
                HEATHER OLSEN ART
              </StyledLink>
            </NavLogo>
            <NavItems>
              { this.displayRoutes() }
              { this.showLogout() }
            </NavItems>
          </StyledNavbar>
        </div>
      )
    };
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default withRouter(connect(mapStateToProps)(NavBar));
