import React from "react";
import { NavLink } from "react-router-dom";
import firebaseApp from "../../firebase/firebaseApp";

const Nav = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/register">Register</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login"> Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/">Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/private">Private</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/user-home">User-Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/events">Events</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/events/search">Places Search</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/favorites">Favorites</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/friendslist">Friends List</NavLink>
          &nbsp;|&nbsp;
          <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
