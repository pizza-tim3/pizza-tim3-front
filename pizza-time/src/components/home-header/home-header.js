import React, { useState } from "react";
import { Link } from "react-router-dom";
// import firebaseApp from "../../firebase/firebaseApp";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Wrap, Inner } from "../../styles/navStyles.js";

// TEST IMAGE
import UserImage from "../../assets/user.png";

const Nav = props => {
  const [image] = useState(UserImage);

  return (
    <Wrap>
      <Inner>
        <div className="userBox">


          <div className="avatar">
            {!props.userReducer.avatar ? (
              <img src={image} className="user" alt="placeholder" />
            ) : (
              <img className="user" src={props.userReducer.avatar}/>
            )}
            <Link to="/create-event" className="newEventBtn">Create Event</Link>
          </div>

          
          <div className="logoutBox">
            <Link to="/" className="logoutBtn">Logout</Link>
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
