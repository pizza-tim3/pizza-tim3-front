import React from "react";

const Participants = props => {
  return (
    <div>
      <h1>Participants</h1>
      {props.event.attending_users ? (
        <ul>
          {props.event.attending_users.map((user, index) => {
            return <li key={index}>{user.name}</li>;
          })}
        </ul>
      ) : (
        <div />
      )}
    </div>
  );
};
export default Participants;
