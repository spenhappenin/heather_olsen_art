import React, { Component } from 'react'
import { Menu, Button, Sidebar, Segment, Icon, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  background-color: #131313 !important;
	position: fixed !important;
	bottom: 0 !important;
  height: 74px;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
`
const StyledMenuItem = styled(Menu.Item)`
  color: #a8a8a8 !important;
  font-size: 16px;
  font-family: 'Raleway', sans-serif !important;
  text-tranform: uppercase !important;
`

class NavBar extends Component {

  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if(user.id) {
      return(
        <Menu.Menu position='right'>
          <StyledMenuItem
            name='Logout'
            onClick={() => dispatch(handleLogout(history))}
          />
        </Menu.Menu>
      );
    } else {
      return(
        <Menu.Menu position='right'>
          <Link to='/login'>
            <StyledMenuItem name='Comissions' />
          </Link>
          <Link to='/login'>
            <StyledMenuItem name='Paintings' />
          </Link>
          <Link to='/login'>
            <StyledMenuItem name='Drawings' />
          </Link>                              
          <Link to='/login'>
            <StyledMenuItem name='CV' />
          </Link>           
          <Link to='/login'>
            <StyledMenuItem name='Contact' />
          </Link>                                 
          <Link to='/login'>
            <StyledMenuItem name='Admin' />
          </Link>
        </Menu.Menu>
      );
    }
  }

  render() {
    return (
      <div>

        <StyledMenu pointing secondary>
          <Link to='/'>
            <StyledMenuItem name='Heather Olsen Art' />
          </Link>
          { this.rightNavs() }
        </StyledMenu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));