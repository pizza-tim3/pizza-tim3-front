import React from "react";
import { Route, Redirect } from "react-router-dom";

/*  
Make a function that automatically destructs the passed component
authenticated status and the rest of the props
*/
export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  /*
  If user is authenticated, render the component with the 
  render props and the rest of the props coming in from 
  the private route.
  */
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

/* USAGE 
<PrivateRoute
    exact
    path="/"
    component={WhateverYouComponentIs}
    authenticated={state.authenticated}
/>
*/
