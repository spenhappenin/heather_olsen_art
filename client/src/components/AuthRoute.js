import React, { useContext, } from "react";
import { AuthContext, } from "../providers/AuthProvider";
import { Redirect, Route, } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated, } = useContext(AuthContext);

  return (
    <Route
      { ...rest }
      render={ props => (
        !authenticated ? 
          <Component {...props} />
        : 
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
      )}
    />
  )
};

export default AuthRoute;
