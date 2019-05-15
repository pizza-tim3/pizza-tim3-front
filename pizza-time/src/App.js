import React, { useState, useEffect } from "react";
import firebaseApp from "./firebase/firebaseApp";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Private from "./components/private/Private";
import UserDashboard from "./components/user-dashboard/user-dashboard";
import Events from "./components/events/events";
import Favorites from "./components/favorites/favorites";
import FriendsList from "./components/friends-lists/friends-list";
import Landing from "./components/landing-page/landing";
import Login from "./components/login/login";
import Register from "./components/register/Register";
import PlacesSearch from "./components/events/search/places-search";


function App() {
  //placeholder state, realistically this will be in redux or some reducer
  const [authenticated, setAuthenticated] = useState(false);

  //check for auth only happens on mount
  useEffect(() => {
    //`onAuthStateChanged` is an `observer` which watches and runs a callback
    //anytime a user's logged in status has been changed.
    //this logic should be global.
    firebaseApp.auth().onAuthStateChanged(user => {
      console.log("AuthStateChanged");
      //firebase
      if (user) {
        //HANDLE USER STATE IN REDUX/COMPONENT STATE
        setAuthenticated(true);
      } else {
        //NO USER, CLEAR THE USER
        setAuthenticated(false);
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
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/user-home" component={UserDashboard} />
        <Route path="/events" component={Events} />
        <Route path="/events/search" component={PlacesSearch} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/friendslist" component={FriendsList} />
        <Route path="/" component={Landing} />

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

export default App;
