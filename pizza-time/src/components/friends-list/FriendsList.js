import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ProfileListContainer,
  ListToolBar,
  Button
} from "../../styles/profileStyles";

import FriendSearchBox from "../../components/friend-search-box/friend-search-box";
import FriendCard from "../friend-card/FriendCard";

//our backend url
const backend = process.env.REACT_APP_BACK_END_URL;

const FriendsList = ({ firebase_uid }) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    //Immediately Invoked Function Expression
    /*https://developer.mozilla.org/en-US/docs/Glossary/IIFE#targetText=An%20IIFE%20(Immediately%20Invoked%20Function,and%20contains%20two%20major%20parts.*/
    (async function() {
      const response = await fetch(`${backend}/api/friends/${firebase_uid}`);
      const json = await response.json();
      setFriends(json);
    })();
  }, []);

  return (
    <div>
      <ListToolBar>
        <FriendSearchBox />
        <a href="#">Invite A Friend!</a>
      </ListToolBar>
      <ProfileListContainer>
        {friends.map(friend => (
          <FriendCard friend={friend} key={friend.firebase_uid} />
        ))}
      </ProfileListContainer>
    </div>
  );
};

const mstp = ({ userReducer }) => userReducer;

export default connect(
  mstp,
  {}
)(FriendsList);
