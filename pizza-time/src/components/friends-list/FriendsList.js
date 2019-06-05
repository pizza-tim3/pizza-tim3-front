import React from "react";

const FriendsList = ({ friends }) => {
  return (
    <div>
      <h3>FriendsList Works!</h3>
      {friends.map(friend => (
        <div>
          <img>{friend.avatar}</img>
          <h4>{friend.username}</h4>
          <p>{friend.location}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
