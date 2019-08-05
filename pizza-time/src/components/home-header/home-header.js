import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "../../firebase/firebaseApp";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import home from '../../assets/home.png';
import { Wrap, Inner } from "../../styles/navStyles.js";

// TEST IMAGE
import UserImage from "../../assets/user.png";

const Nav = props => {
  const [image] = useState(UserImage);

  const handleSignOut = () => {
    firebaseApp.auth().signOut();
  }

  return (
    <Wrap>
      <Inner>
        <div className="userBox">
          <div className="avatar">
            {!props.userReducer.avatar ? (
              <Link to="/profile">
                <img src={image} className="user" alt="placeholder" />
              </Link>
            ) : (
              <Link to="/profile">
                <img className="user" src={props.userReducer.avatar}/>
              </Link>
            )}
            <Link to="/create-event" className="newEventBtn">Create Event</Link>
          </div>
          <div className="navigation">
            <button
              className="newEventBtn"
              onClick={() => handleSignOut()}>
                Logout
            </button>
            <Link to='/home'><img src={home} alt='home' className="home"/></Link>
          </div>
        </div>
      </Inner>
    </Wrap>
  );
};

// export default Nav;
const mstp = ({ userReducer /**,otherReducer */ }) => {
  return { userReducer };
};
export default withRouter(
  connect(
    mstp,
    {}
  )(Nav)
);
