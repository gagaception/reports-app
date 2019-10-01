import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const ProtectedRoute = ({
    component,
    isLoggedIn, ...rest
  }) => (
  <Route 
    {...rest} 
    render={
      routeProps => isLoggedIn === true 
      ? renderMergedProps(component, routeProps, rest)
      : <Redirect to={{pathname: '/login', state: {from: routeProps.location}}} />
    } />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default ProtectedRoute;