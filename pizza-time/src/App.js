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
    const userSigningUp = localStorage.getItem('signUpStatus');
    if(userSigningUp === '0') {
      return
    } else {
      firebaseApp.auth().onAuthStateChanged(authUser => {
        if(authUser) {
          return firebaseApp.auth().currentUser.getIdToken()
            .then(idToken => {
              axios.defaults.headers.common['Authorization'] = idToken;

              axios.get(`https://pizza-tim3-be.herokuapp.com/api/users/${authUser.uid}`)
                .then(res => {
                  this.props.setUser(res.data);
                  this.setState({ authenticated: true });
                  localStorage.setItem('firebase_uid', res.data.firebase_uid);
                  this.props.history.push('/home')
                }).catch(e => console.log('ERROR:', e));
            }).catch();
        } else {
          localStorage.clear();
          this.setState({ authenticated: false });
          this.props.history.push('/login');
        }
      });
    }
  };

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
          <Route exact path="/profile" component={Profile} />

          {/* <PrivateRoute
            path="/profile"
            authenticated={authenticated}
            component={Profile}
          />
          <PrivateRoute
            exact
            path="/private"
            component={Private}
            authenticated={authenticated} //pass global authenticated status here
          /> */}
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
