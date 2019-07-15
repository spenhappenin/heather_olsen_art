import React, { useContext, } from 'react';
import { AuthContext, } from "../providers/AuthProvider";
// import { renderMergedProps, } from '../helpers/routes';
import { Redirect, Route, } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authenticated, } = useContext(AuthContext);
  return (
    <Route
      { ...rest }
      render={ props => (
        authenticated ?
          <Component {...props} />
        :
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location, },
            }}
          />
      )}
    />
  );
};

export default ProtectedRoute;
