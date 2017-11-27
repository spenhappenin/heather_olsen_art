import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PropsRoute, renderMergedProps } from '../helpers/routes';

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

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.id }
}

export default connect(mapStateToProps)(ProtectedRoute);