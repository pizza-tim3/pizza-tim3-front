import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebaseApp from "./firebase/firebaseApp";
import "./App.css";

//actions
import { setUser, clearUser } from "./actions/index";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Private from "./components/private/Private";
import UserDashboard from "./containers/user-dashboard/user-dashboard";
import CreateNewEvent from "./components/events/create-new-event/create-new-event";
import EventView from "./components/events/SingleEvent/eventView";
import Landing from "./containers/landing-page/landing";
import Login from "./containers/login/login";
import Register from "./containers/register/Register";
import Profile from "./containers/profile/Profile";
import UsersList from "./../src/admin/UsersList";

function App(props) {
  //placeholder state, realistically this will be in redux or some reducer
  const [authenticated, setAuthenticated] = useState(false);

  //check for auth only happens on mount
  useEffect(() => {
    //`onAuthStateChanged` is an `observer` which watches and runs a callback
    //anytime a user's logged in status has been changed.
    //this logic should be global.

    firebaseApp.auth().onAuthStateChanged(async user => {

      //console.log("AuthStateChanged : ", user.uid);

      //firebase

      if (user) {
        //HANDLE USER STATE IN REDUX/COMPONENT STATE

        //get user info from our server
        const { uid } = user;
        const response = await fetch(
          `${process.env.REACT_APP_BACK_END_URL}/api/users/${uid}`
        );
        const userInfo = await response.json();
        //set user info from our backend on global user object
        props.setUser(userInfo);

        //set local storage to store last login state
        console.log("AuthStateChanged : ", user.uid);
        localStorage.setItem("lastLoginState", "1");

        localStorage.setItem("userFireBaseId", user.uid);
        setAuthenticated(true);
      } else {
        //NO USER, CLEAR THE USER

        //remove local storage login state
        localStorage.removeItem("lastLoginState");
        //remove user from global object
        props.clearUser();
        setAuthenticated(false); //TODO CHANGE THIS TO AN AUTH REDUCER
      }
    });
  }, []); //<-The second argument is a useEffect's `deps` or `dependancies
  //The effect will re-run ANY time ANY of the deps have changed
  //Since there are NO deps this will only run on the mount
  //making it very close to `componentDidMount`

  return (
    <div className="App">
      {/* setting these up seperately initially so we can nav to each path 
    to see what we are working on can combine them as neccessary later */}
      <Switch>
        <Route exact path="/admin/users" component={UsersList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={UserDashboard} />
        <Route path="/create-event" component={CreateNewEvent} />
        <Route exact path="/event/:id" component={EventView} />
        <PrivateRoute
          path="/profile/"
          authenticated={authenticated}
          component={Profile}
        />
        <Route exact path="/" component={Landing} />
        {/* TODO Change landing to exact */}

        <PrivateRoute
          path="/profile"
          authenticated={authenticated}
          component={Profile}
        />
        <PrivateRoute
          exact
          path="/private"
          component={Private}
          authenticated={authenticated} //pass global authenticated status here
        />
      </Switch>
    </div>
  );
}

//Here I've destructured the single reducer
const mstp = ({ userReducer /**,otherReducer */ }) => {
  console.log(userReducer);
  return { userReducer };
};

//react-router-v4-not-working-with-redux
// https://stackoverflow.com/a/45056258
//TLDR you need to wrap connect() with withRouter() `withRouter(connect()());`
export default withRouter(
  connect(
    mstp,
    { setUser, clearUser }
  )(App)
);
