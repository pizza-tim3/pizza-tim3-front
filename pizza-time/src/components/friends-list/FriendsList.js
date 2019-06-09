import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const FriendsList = ({ firebase_uid }) => {
  console.log(firebase_uid);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    //Immediately Invoked Function Expression
    /*https://developer.mozilla.org/en-US/docs/Glossary/IIFE#targetText=An%20IIFE%20(Immediately%20Invoked%20Function,and%20contains%20two%20major%20parts.*/
    (async function() {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_URL}/api/friends/firebase_uid`
      );
      const json = await response.json();
      console.log(json);
      setFriends(json);
    })();
  }, []);
  return (
    <div>
      <h3>FriendsList Works!</h3>
      {friends.map(friend => (
        <div key={friend.id}>
          <img>{friend.avatar}</img>
          <h4>
            {friend.first_name} {friend.last_name}
          </h4>
          <p>{friend.location}</p>
        </div>
      ))}
    </div>
  );
};

const mstp = ({ userReducer }) => userReducer;

export default connect(
  mstp,
  {}
)(FriendsList);
