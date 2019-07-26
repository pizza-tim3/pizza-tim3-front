import React, {Component, useReducer} from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import firebaseApp from "./firebase/firebaseApp";
import "./App.css";
import axios from 'axios';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }

  componentDidMount(){
    this.listener = firebaseApp.auth().onAuthStateChanged(async user => {
      console.log(user)
      console.log(firebaseApp.auth.currentUser)
      //firebase
      if (this.props.user && user) {

        //HANDLE USER STATE IN REDUX/COMPONENT STATE
        //get user info from our server
        return firebaseApp.auth.currentUser.getIdToken().then(async idToken => {
          axios.defaults.headers.common['Authorization'] = idToken;
          console.log(idToken)

          const { uid } = user;
          const response = await fetch(
            `${process.env.REACT_APP_BACK_END_URL}/api/users/${uid}`);
          const userInfo = await response.json();
          this.props.setUser(userInfo);

          this.setState({
            authenticated: false
          })
        }).catch(e => console.log(e));

      } else {

        localStorage.removeItem("lastLoginState");
        this.props.clearUser();
        this.setState({
          authenticated: false
        }) // TODO CREATE AUTH REDUCER
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/admin/users" component={UsersList} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={UserDashboard} />
          <Route path="/create-event" component={CreateNewEvent} />
          <Route exact path="/event/:id" component={EventView} />
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
    )
  }
}

//Here I've destructured the single reducer
const mstp = state => {
  return {
    user: state.userReducer.firebase_uid
  };
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
