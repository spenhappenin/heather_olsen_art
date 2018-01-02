import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import { StyledLink, StyledMenu, StyledMenuItem } from '../styles/navbar';
import { Grid, Icon, Menu } from 'semantic-ui-react';

class NavBar extends Component {
  showLogout = () => {
    const { user, dispatch, history } = this.props;
    if(user.id) {
      return(
        <Menu.Item
          as={StyledMenuItem}
          name='Logout'
          link
          onClick={() => dispatch(handleLogout(history))}
          style={styles.logout}
        />
      )
    }
  }

  rightNavs = () => {
    if(this.props.user.id) {
      return (
        <Grid>
          <Grid.Row only='computer tablet'>
            <Menu.Menu position='right'>
              <StyledLink to='/'>
                <Menu.Item as={StyledMenuItem} title content='Heather Olsen Art' />
              </StyledLink>
              <StyledLink to='/admin-comissions'>
                <Menu.Item as={StyledMenuItem} name='Comissions' />
              </StyledLink>
              <StyledLink to='/admin-paintings'>
                <Menu.Item as={StyledMenuItem} name='Paintings' />
              </StyledLink>
              <StyledLink to='/admin-drawings'>
                <Menu.Item as={StyledMenuItem} name='Drawings' />
              </StyledLink>
              <StyledLink to='/admin-cv'>
                <Menu.Item as={StyledMenuItem} name='CV' />
              </StyledLink>
              <StyledLink to='/contact'>
                <Menu.Item as={StyledMenuItem} name='Contact' />
              </StyledLink>
              {this.showLogout()}
            </Menu.Menu>
          </Grid.Row>

          <Grid.Row only='mobile' textAlign='center'>
            <Menu.Item onClick={this.handleSidebar}>
              <Icon
                name='sidebar'
                size='large'
                onClick={this.props.toggleSideNav}
                inverted
                color='grey'
              />
            </Menu.Item>
            <StyledLink to='/'>
              <Menu.Item as={StyledMenuItem} style={styles.title} title content='Heather Olsen Art' />
            </StyledLink>
          </Grid.Row>

        </Grid>
      )
    } else {
      return(
        <Grid>
          <Grid.Row only='computer tablet'>
            <Menu.Menu position='right'>
              <StyledLink to='/'>
                <Menu.Item as={StyledMenuItem} title content='Heather Olsen Art' />
              </StyledLink>
              <StyledLink to='/comissions'>
                <Menu.Item as={StyledMenuItem} name='Comissions' />
              </StyledLink>
              <StyledLink to='/paintings'>
                <Menu.Item as={StyledMenuItem} name='Paintings' />
              </StyledLink>
              <StyledLink to='/drawings'>
                <Menu.Item as={StyledMenuItem} name='Drawings' />
              </StyledLink>                              
              <StyledLink to='/cv'>
                <Menu.Item as={StyledMenuItem} name='CV' />
              </StyledLink>           
              <StyledLink to='/contact'>
                <Menu.Item as={StyledMenuItem} name='Contact' />
              </StyledLink>                                 
              { this.showLogout() }
            </Menu.Menu>
          </Grid.Row>

          <Grid.Row only='mobile' textAlign='center'>
            <Menu.Item as={StyledMenuItem}>
              <Icon
                name='sidebar'
                size='large'
                onClick={this.props.toggleSideNav}
                inverted
                color='grey'
              />
            </Menu.Item>
            <StyledLink to='/'>
              <Menu.Item as={StyledMenuItem} style={styles.title} title content='Heather Olsen Art' />
            </StyledLink>
          </Grid.Row>

        </Grid>
      );
    }
  }

  render() {
    return (
      <div>
        <Menu as={StyledMenu} pointing secondary>
          { this.rightNavs() }
        </Menu>
      </div>
    )
  }
}

const styles = {
  logout: {
    marginBottom: '2px'
  },
  title: {
    marginLeft: '15px'
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));