import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Wrap, ProfileListContainer, ListToolBar } from "../../styles/profileStyles";
import axios from 'axios';
import FriendSearchBox from "../../components/friend-search-box/friend-search-box";
import FriendCard from "../friend-card/FriendCard";

const FriendsList = ({ firebase_uid }) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    //Immediately Invoked Function Expression
    /*https://developer.mozilla.org/en-US/docs/Glossary/IIFE#targetText=An%20IIFE%20(Immediately%20Invoked%20Function,and%20contains%20two%20major%20parts.*/
    // (async function() {
    //   console.log("ID",firebase_uid)
    //   const response = await fetch(`${backend}/api/friends/${firebase_uid}`);
    //   const json = await response.json();
    //   setFriends(json);
    // })();
    const uid = localStorage.getItem('firebase_uid')
    axios.get(`https://pizza-tim3-be.herokuapp.com/api/friends/${uid}`)
  }, []);

  return (
    <Wrap>
      <ListToolBar>
        <FriendSearchBox />
      </ListToolBar>
      <ProfileListContainer>
        {friends ? friends.map(friend => (
          <FriendCard friend={friend} key={friend.firebase_uid} />
        )) : <div>No Friends Yet!</div>}
      </ProfileListContainer>
    </Wrap>
  );
};

const mstp = ({ userReducer }) => userReducer;

export default connect(
  mstp,
  {}
)(FriendsList);
