import React from 'react';
import { renderMergedProps, } from '../helpers/routes';
import { Redirect, Route, } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        renderMergedProps(Component, props, rest)
      ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
    )} />
)

// const mapStateToProps = (state) => {
//   return { isAuthenticated: state.user.id }
// }

export default ProtectedRoute;