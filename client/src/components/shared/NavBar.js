import React from 'react';
import { connect, } from 'react-redux';
import { handleLogout, } from '../../actions/auth';
import { Icon, } from 'semantic-ui-react';
import { withRouter, } from 'react-router-dom';
import { NavItems, NavLogo, StyledLink, StyledMockLink, StyledNavbar, } from '../../styles/navbar';

class NavBar extends React.Component {
  state = { windowWidth: window.innerWidth, };

  handleResize = (e) => this.setState({ windowWidth: window.innerWidth });

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  };

  showLogout = () => {
    const { user, dispatch, history } = this.props;

    if(user.id) {
      return(
        <StyledMockLink 
          onClick={() => dispatch(handleLogout(history))} 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          LOGOUT
        </StyledMockLink>
      )
    }
  };

  rightNavs = () => {
    const { id, } = this.props.user;

    return (
      <NavItems>
        <StyledLink 
          to={ id ? '/admin-paintings' : '/paintings'} 
          activeStyle={{ color: '#525252' }} 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          PAINTINGS
        </StyledLink>
        <StyledLink 
          to={ id ? '/admin-drawings' : 'drawings' } 
          activeStyle={{ color: '#525252' }} 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          DRAWINGS
        </StyledLink>
        <StyledLink 
          to={ id ? '/admin-comissions' : 'comissions' }
          activeStyle={{ color: '#525252' }} 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          COMISSIONS
        </StyledLink>
        <StyledLink 
          to={ id ? '/admin-cv' : '/cv' }
          activeStyle={{ color: '#525252' }} 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          CV
        </StyledLink>
        <StyledLink 
          to='/media' 
          activeStyle={{ color: '#525252' }} 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          MEDIA
        </StyledLink>
        <StyledLink 
          to='/contact' 
          activeStyle={{ color: '#525252' }} 
          className='nav-link' 
          rel="noopener noreferrer"
        >
          CONTACT
        </StyledLink>
        { this.showLogout() }
      </NavItems>
    );
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
            { this.rightNavs() }
          </StyledNavbar>
        </div>
      )
    }
  }
};

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default withRouter(connect(mapStateToProps)(NavBar));
