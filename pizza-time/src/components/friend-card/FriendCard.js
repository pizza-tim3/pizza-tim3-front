import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, FriendInfoContainer } from "../../styles/profileStyles";

//our backend url
const backend = process.env.REACT_APP_BACK_END_URL;

//kept getting an error while destructing in the params
function FriendCard({
  friend: {
    id,
    status,
    avatar,
    first_name,
    last_name,
    firebase_uid: friend_uid,
  },
  userReducer: { firebase_uid },
}) {
  const [pending, setPending] = useState(status === "pending");

  //really need to write a function that lets you make authenticated reqs
  // api/friends/accept/:user_uid/:friend_uid
  const request = async url => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setPending(false);
  };

  return (
    <FriendInfoContainer key={id} status={status}>
      <img className="user" src={avatar} alt="user's avatar" />
      <h4>
        {first_name} {last_name}
      </h4>
      <p>Location</p>
      {pending ? (
        <Button
          onClick={() =>
            request(
              `${backend}/api/friends/accept/${firebase_uid}/${friend_uid}`
            )
          }
        >
          Accept
        </Button>
      ) : null}
      {pending ? (
        <Button
          onClick={() =>
            request(
              `${backend}/api/friends/reject/${firebase_uid}/${friend_uid}`
            )
          }
        >
          Reject
        </Button>
      ) : null}
    </FriendInfoContainer>
  );
}

const mstp = state => state;

export default connect(
  mstp,
  {}
)(FriendCard);
