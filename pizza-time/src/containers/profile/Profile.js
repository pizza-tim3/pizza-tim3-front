import React from "react";
import { connect } from "react-redux";

import Header from "../../components/home-header/home-header.js";
import ProfileUserInfo from "../../components/profile-user-info/profile-user-info";
import Favorites from "../../components/favorites/Favorites";
import FriendsList from "../../components/friends-list/FriendsList";

import { Wrap, Inner } from "../../styles/userhomeStyles.js";

const Profile = props => {
  return (
    <div>
      <Header />
      <Wrap>
        <ProfileUserInfo {...props.userReducer} />
        <FriendsList />
      </Wrap>
    </div>
  );
};

//Here I've destructured the single reducer
const mstp = ({ userReducer /**,otherReducer */ }) => {
  return { userReducer };
};

export default connect(
  mstp,
  {}
)(Profile);
