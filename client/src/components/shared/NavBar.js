import React from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import { StyledLink, StyledMockLink, StyledNavbar, NavItem, NavItems, NavLogo } from '../../styles/navbar';
import { Icon } from 'semantic-ui-react';

class NavBar extends React.Component {
  state = { windowWidth: window.innerWidth };

  handleResize = (e) => this.setState({ windowWidth: window.innerWidth });

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  showLogout = () => {
    const { user, dispatch, history } = this.props;
    if(user.id) {
      return(
        <StyledMockLink onClick={() => dispatch(handleLogout(history))} className='nav-link'>
          Logout
        </StyledMockLink>
      )
    }
  };

  rightNavs = () => {
    if(this.props.user.id) {
      return(
        <NavItems>
          <StyledLink to='/admin-paintings' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Paintings
          </StyledLink>
          <StyledLink to='/admin-drawings' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Drawings
          </StyledLink>
          <StyledLink to='/admin-comissions' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Comissions
          </StyledLink>
          <StyledLink to='/admin-cv' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            CV
          </StyledLink>
          <StyledLink to='/media' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Media
          </StyledLink>
          <StyledLink to='/contact' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Contact
          </StyledLink>
          {this.showLogout()}
        </NavItems>
      )
    } else {
      return(
        <NavItems>
          <StyledLink to='/paintings' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Paintings
          </StyledLink>
          <StyledLink to='/drawings' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Drawings
          </StyledLink>
          <StyledLink to='/comissions' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Comissions
          </StyledLink>
          <StyledLink to='/cv' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            CV
          </StyledLink>
          <StyledLink to='/media' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Media
          </StyledLink>
          <StyledLink to='/contact' activeStyle={{ color: '#3c3c3c' }} className='nav-link'>
            Contact
          </StyledLink>
          { this.showLogout() }
        </NavItems>
      )
    }
  };
  
  render() {
    const { windowWidth } = this.state;
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
            <StyledLink to='/' title>
              Heather Olsen Art
            </StyledLink>
          </NavLogo>
        </StyledNavbar>
      )
    } else {
      return (
        <div>
          <StyledNavbar>
            <NavLogo>
              <StyledLink to='/' title>
                Heather Olsen Art
              </StyledLink>
            </NavLogo>
            { this.rightNavs() }
          </StyledNavbar>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));