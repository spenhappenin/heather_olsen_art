import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { StyledMenu, StyledMenuItem } from '../styles/navbar';
import { Grid, Menu } from 'semantic-ui-react';

class NavBar extends Component {

  showLogout = () => {
    const { user, dispatch, history } = this.props;
    if(user.id) {
      return(
        <Menu.Item
          as={StyledMenuItem}
          name='Logout'
          onClick={() => dispatch(handleLogout(history))}
        />
      )
    } else {
      return(
        <Link to='/login'>
          <Menu.Item as={StyledMenuItem} name='Admin' />
        </Link>
      )
    }
  }

  rightNavs = () => {
    if(this.props.user.id) {
      return (
        <Grid>
          <Grid.Row only='computer tablet'>
            <Menu.Menu position='right'>
              <Link to='/admin-comissions'>
                <Menu.Item as={StyledMenuItem} name='Comissions' />
              </Link>
              <Link to='/admin-paintings'>
                <Menu.Item as={StyledMenuItem} name='Paintings' />
              </Link>
              <Link to='/admin-drawings'>
                <Menu.Item as={StyledMenuItem} name='Drawings' />
              </Link>
              <Link to='/admin-cv'>
                <Menu.Item as={StyledMenuItem} name='CV' />
              </Link>
              <Link to='/admin-contact'>
                <Menu.Item as={StyledMenuItem} name='Contact' />
              </Link>
              {this.showLogout()}
            </Menu.Menu>
          </Grid.Row>
        </Grid>
      )
    } else {
      return(
        <Grid>
          <Grid.Row only='computer tablet'>
            <Menu.Menu position='right'>
              <Link to='/comissions'>
                <Menu.Item as={StyledMenuItem} name='Comissions' />
              </Link>
              <Link to='/paintings'>
                <Menu.Item as={StyledMenuItem} name='Paintings' />
              </Link>
              <Link to='/drawings'>
                <Menu.Item as={StyledMenuItem} name='Drawings' />
              </Link>                              
              <Link to='/cv'>
                <Menu.Item as={StyledMenuItem} name='CV' />
              </Link>           
              <Link to='/contact'>
                <Menu.Item as={StyledMenuItem} name='Contact' />
              </Link>                                 
              { this.showLogout() }
            </Menu.Menu>
          </Grid.Row>
        </Grid>
      );
    }
  }

  render() {
    return (
      <div>
        <Menu as={StyledMenu} pointing secondary>
          <Link to='/'>
            <Menu.Item as={StyledMenuItem} name='Heather Olsen Art' />
          </Link>
          { this.rightNavs() }
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));