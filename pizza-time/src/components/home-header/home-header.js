import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "../../firebase/firebaseApp";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { Wrap, Inner } from "../../styles/navStyles.js";

// TEST IMAGE
import UserImage from "../../assets/user.png";

const Nav = () => {
  const [image] = useState(UserImage);
  const [userNav, setUserNave] = useState(false);

  const ToggleNav = e => {
    e.preventDefault();
    setUserNave(!userNav);
  };

  return (
    <Wrap>
      <Inner>
        <Link to="/" className="link">
          <h1>Let's Get Pizza</h1>
        </Link>
        <div className="userBox">
          <button className="newEventBtn">
            <Link to="/create-event" className="link">
              Create New Event
            </Link>
          </button>

          <img className="user" src={image} onClick={ToggleNav} />
          <ReactCSSTransitionGroup
            transitionName="navToggle"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={100}
          >
            {userNav ? <div className="userNav" /> : null}
          </ReactCSSTransitionGroup>
        </div>

        {/* <div className="navBox">
            <button className="newEventBtn">New Event</button>
        </div> */}
        {/* <nav>
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
        </nav> */}
      </Inner>
    </Wrap>
  );
};

export default Nav;
