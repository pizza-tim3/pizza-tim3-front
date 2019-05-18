import React, { useState, useEffect } from "react";
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
      render={props => {
        if (authenticated === true) return <Component {...props} {...rest} />;
        else if (localStorage.getItem("lastLoginState"))
          //checks local storage for logged in status
          return <h1>Loading</h1>;
        else return <Redirect to="/login" />;
      }}
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
