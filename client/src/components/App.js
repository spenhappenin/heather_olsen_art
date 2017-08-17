import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router-dom';
import FetchUser from './FetchUser';
import { Menu, Button, Sidebar, Segment, Icon, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
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
const StyledSideContainer = styled(Sidebar.Pusher)`
  background-color: red !important;

`
const StyledSideMenu = styled(Segment)`
`
const Foo = styled(Sidebar.Pushable)`
  background-color: red;
`

class App extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;


        // <Icon name='content' size='big' color='grey' onClick={this.toggleVisibility} />
        // <Sidebar.Pushable as={Segment}>
        //   <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
        //     <Link to='/login'>
        //       <Menu.Item name='home'>
        //         Home
        //       </Menu.Item>
        //     </Link>
        //     <Link to='/login'>
        //       <Menu.Item name='commissions'>
        //         Commissions
        //       </Menu.Item>
        //     </Link>
        //     <Link to='/login'>
        //       <Menu.Item name='paintings'>
        //         Paintings
        //       </Menu.Item>
        //     </Link>
        //     <Link to='/login'>
        //       <Menu.Item name='drawings'>
        //         Drawings
        //       </Menu.Item>
        //     </Link>
        //     <Link to='/login'>
        //       <Menu.Item name='cv'>
        //         CV
        //       </Menu.Item>
        //     </Link>
        //     <Link to='/login'>
        //       <Menu.Item name='contact'>
        //         Contact
        //       </Menu.Item>  
        //     </Link>
        //     <Link to='/login'>                                              
        //       <Menu.Item name='admin'>
        //         Admin
        //       </Menu.Item>  
        //     </Link>              
        //   </Sidebar>
        //   <StyledSideContainer>
        //   </StyledSideContainer>
        // </Sidebar.Pushable>