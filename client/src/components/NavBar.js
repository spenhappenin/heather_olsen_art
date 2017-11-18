import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Header, Icon, Image, Menu, Segment } from 'semantic-ui-react';

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
        <Grid>
        <Grid.Row only='computer tablet'>
        <Menu.Menu position='right'>
          <Link to='/comissions'>
            <StyledMenuItem name='Comissions' />
          </Link>
          <Link to='/'>
            <StyledMenuItem name='Paintings' />
          </Link>
          <Link to='/'>
            <StyledMenuItem name='Drawings' />
          </Link>                              
          <Link to='/'>
            <StyledMenuItem name='CV' />
          </Link>           
          <Link to='/'>
            <StyledMenuItem name='Contact' />
          </Link>                                 
          <Link to='/login'>
            <StyledMenuItem name='Admin' />
          </Link>
        </Menu.Menu>
        </Grid.Row>
        </Grid>
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

export default withRouter(connect(mapStateToProps)(NavBar));