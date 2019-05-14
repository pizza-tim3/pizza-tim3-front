import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import UserDashboard from './components/user-dashboard/user-dashboard';
import Nav from './components/nav/nav';
import Events from './components/events/events';
import Favorites from './components/favorites/favorites';
import Footer from './components/footer/footer';
import FriendsList from './components/friends-lists/friends-list';
import Landing from './components/landing-page/landing';
import Login from './components/login/login';
import PlacesSearch from './components/events/search/places-search';

function App() {
  return (
    <div className="App">
    {/* setting these up seperately initially so we can nav to each path 
    to see what we are working on can combine them as neccessary later */}
      <Route path='/' component={Nav} />
      <Route path='/login' component={Login} />
      <Route path='/home' component={Landing} />
      <Route path='/user-home' component={UserDashboard} />
      <Route path='/events' component={Events} />
      <Route path='/events/search' component={PlacesSearch} />
      <Route path='/favorites' component={Favorites} />
      <Route path='/friendslist' component={FriendsList} />
      <Route path='/' component={Footer} />
    </div>
  );
}

export default App