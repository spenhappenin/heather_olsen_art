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
        <StyledMockLink>
          <NavItem onClick={() => dispatch(handleLogout(history))}>
            Logout
          </NavItem>
        </StyledMockLink>
      )
    }
  };

  rightNavs = () => {
    if(this.props.user.id) {
      return(
        <NavItems>
          <StyledLink to='/admin-paintings'>
            <NavItem>Paintings</NavItem>
          </StyledLink>
          <StyledLink to='/admin-drawings'>
            <NavItem>Drawings</NavItem>
          </StyledLink>
          <StyledLink to='/admin-comissions'>
            <NavItem>Comissions</NavItem>
          </StyledLink>
          <StyledLink to='/admin-cv'>
            <NavItem>CV</NavItem>
          </StyledLink>
          <StyledLink to='/media'>
            <NavItem>Media</NavItem>
          </StyledLink>
          <StyledLink to='/contact'>
            <NavItem>Contact</NavItem>
          </StyledLink>
          {this.showLogout()}
        </NavItems>
      )
    } else {
      return(
        <NavItems>
          <StyledLink to='/paintings'>
            <NavItem>Paintings</NavItem>
          </StyledLink>
          <StyledLink to='/drawings'>
            <NavItem>Drawings</NavItem>
          </StyledLink>
          <StyledLink to='/comissions'>
            <NavItem>Comissions</NavItem>
          </StyledLink>
          <StyledLink to='/cv'>
            <NavItem>CV</NavItem>
          </StyledLink>
          <StyledLink to='/media'>
            <NavItem>Media</NavItem>
          </StyledLink>
          <StyledLink to='/contact'>
            <NavItem>Contact</NavItem>
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
            <StyledLink to='/'>
              <NavItem title>Heather Olsen Art</NavItem>
            </StyledLink>
          </NavLogo>
        </StyledNavbar>
      )
    } else {
      return (
        <div>
          <StyledNavbar>
            <NavLogo>
              <StyledLink to='/'>
                <NavItem title>Heather Olsen Art</NavItem>
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