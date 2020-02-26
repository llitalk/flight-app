import { Route, Switch, Router, Redirect } from 'react-router';
import React from 'react';

export default ({ component: C, appProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      appProps.isAuthenticated
        ? <C {...props} {...appProps} />
        : <Redirect to="/login" />}
  />;