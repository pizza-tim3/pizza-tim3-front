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
          <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
