import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import { StyledLink, StyledMockLink, StyledNavbar, StyledNavItem, StyledNavItems, StyledNavLogo } from '../../styles/navbar';
import { Grid, Icon, Menu, Header } from 'semantic-ui-react';

class NavBar extends Component {

  showLogout = () => {
    const { user, dispatch, history } = this.props;
    if(user.id) {
      return(
        <StyledMockLink>
          <StyledNavItem onClick={() => dispatch(handleLogout(history))}>
            Logout
          </StyledNavItem>
        </StyledMockLink>
      )
    }
  };

  rightNavs = () => {
    if(this.props.user.id) {
      return(
        <StyledNavItems>
          <StyledLink to='/paintings'>
            <StyledNavItem>Paintings</StyledNavItem>
          </StyledLink>
          <StyledLink to='/drawings'>
            <StyledNavItem>Drawings</StyledNavItem>
          </StyledLink>
          <StyledLink to='/comissions'>
            <StyledNavItem>Comissions</StyledNavItem>
          </StyledLink>
          <StyledLink to='/cv'>
            <StyledNavItem>CV</StyledNavItem>
          </StyledLink>
          <StyledLink to='/media'>
            <StyledNavItem>Media</StyledNavItem>
          </StyledLink>
          <StyledLink to='/contact'>
            <StyledNavItem>Contact</StyledNavItem>
          </StyledLink>
          {this.showLogout()}
        </StyledNavItems>
      )
    } else {
      return(
        <StyledNavItems>
          <StyledLink to='/paintings'>
            <StyledNavItem>Paintings</StyledNavItem>
          </StyledLink>
          <StyledLink to='/drawings'>
            <StyledNavItem>Drawings</StyledNavItem>
          </StyledLink>
          <StyledLink to='/comissions'>
            <StyledNavItem>Comissions</StyledNavItem>
          </StyledLink>
          <StyledLink to='/cv'>
            <StyledNavItem>CV</StyledNavItem>
          </StyledLink>
          <StyledLink to='/media'>
            <StyledNavItem>Media</StyledNavItem>
          </StyledLink>
          <StyledLink to='/contact'>
            <StyledNavItem>Contact</StyledNavItem>
          </StyledLink>
          { this.showLogout() }
        </StyledNavItems>
      )
    }
  };
  
  render() {
    return (
      <div>
        <StyledNavbar>
          <StyledNavLogo>
            <StyledLink to='/'>
              <StyledNavItem title>Heather Olsen Art</StyledNavItem>
            </StyledLink>
          </StyledNavLogo>
          { this.rightNavs() }
        </StyledNavbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));


        // oldRightNavs = () => {
        //   if(this.props.user.id) {
        //     return (
        //       <Grid>
        //         <Grid.Row only='computer tablet'>
        //           <Menu.Menu position='right'>
        //             <StyledLink to='/'>
        //               <Menu.Item as={StyledMenuItem} title content='Heather Olsen Art' />
        //             </StyledLink>
        //             <StyledLink to='/admin-paintings'>
        //               <Menu.Item as={StyledMenuItem} name='Paintings' />
        //             </StyledLink>
        //             <StyledLink to='/admin-drawings'>
        //               <Menu.Item as={StyledMenuItem} name='Drawings' />
        //             </StyledLink>
        //             <StyledLink to='/admin-comissions'>
        //               <Menu.Item as={StyledMenuItem} name='Comissions' />
        //             </StyledLink>
        //             <StyledLink to='/admin-cv'>
        //               <Menu.Item as={StyledMenuItem} name='CV' />
        //             </StyledLink>
        //             <StyledLink to='/media'>
        //               <Menu.Item as={StyledMenuItem} name='Media' />
        //             </StyledLink>   
        //             <StyledLink to='/contact'>
        //               <Menu.Item as={StyledMenuItem} name='Contact' />
        //             </StyledLink>
        //             {this.showLogout()}
        //           </Menu.Menu>
        //         </Grid.Row>
        //         <Grid.Row only='mobile' textAlign='center'>
        //           <Menu.Item onClick={this.handleSidebar}>
        //             <Icon
        //               name='sidebar'
        //               size='large'
        //               onClick={this.props.toggleSideNav}
        //               inverted
        //               color='grey'
        //             />
        //           </Menu.Item>
        //           <StyledLink to='/'>
        //             <Menu.Item 
        //               as={StyledMenuItem} 
        //               style={styles.title} 
        //               title 
        //               content='Heather Olsen Art' 
        //               onClick={this.props.closeSideNav}
        //             />
        //           </StyledLink>
        //         </Grid.Row>
        //       </Grid>
        //     )
        //   } else {
        //     return(
        //       <Grid>
        //         <Grid.Row only='computer tablet'>
        //           <Menu.Menu position='right' stackable>
        //             <StyledLink to='/'>
        //               <Menu.Item as={StyledMenuItem} title content='Heather Olsen Art' />
        //             </StyledLink>
        //             <StyledLink to='/admin-paintings'>
        //               <Menu.Item as={StyledMenuItem} name='Paintings' />
        //             </StyledLink>
        //             <StyledLink to='/admin-drawings'>
        //               <Menu.Item as={StyledMenuItem} name='Drawings' />
        //             </StyledLink>                              
        //             <StyledLink to='/admin-comissions'>
        //               <Menu.Item as={StyledMenuItem} name='Comissions' />
        //             </StyledLink>
        //             <StyledLink to='/admin-cv'>
        //               <Menu.Item as={StyledMenuItem} name='CV' />
        //             </StyledLink>
        //             <StyledLink to='/media'>
        //               <Menu.Item as={StyledMenuItem} name='Media' />
        //             </StyledLink>             
        //             <StyledLink to='/contact'>
        //               <Menu.Item as={StyledMenuItem} name='Contact' />
        //             </StyledLink>                                 
        //             { this.showLogout() }
        //           </Menu.Menu>
        //         </Grid.Row>
        //         <Grid.Row only='mobile' textAlign='center'>
        //           <Menu.Item as={StyledMenuItem}>
        //             <Icon
        //               name='sidebar'
        //               size='large'
        //               onClick={this.props.toggleSideNav}
        //               inverted
        //               color='grey'
        //             />
        //           </Menu.Item>
        //           <StyledLink to='/'>
        //             <Menu.Item 
        //               as={StyledMenuItem} 
        //               style={styles.title} 
        //               title 
        //               content='Heather Olsen Art' 
        //               onClick={this.props.closeSideNav}
        //             />
        //           </StyledLink>
        //         </Grid.Row>
        //       </Grid>
        //     );
        //   }
        // }