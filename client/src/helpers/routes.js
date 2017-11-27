import React from 'react';
import { Route } from 'react-router-dom';

// component => ???
// rest => an array of the rest (additional props) and routeProps (props routes gives us)
export const renderMergedProps = (component, ...rest) => {
  // finalProps => takes everything and makes it one big object
  const finalProps = Object.assign({}, ...rest);
  return (
    // create a new React element with the component and final props
    React.createElement(component, finalProps)
  );
}

export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }} />
  );
}