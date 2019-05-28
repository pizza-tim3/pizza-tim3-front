import React from "react";
import { EventRow } from "../../../styles/eventStyles";
import user1 from "../../../assets/users/user-1.png";
import user2 from "../../../assets/users/user-2.png";
import user3 from "../../../assets/users/user-3.png";
import user4 from "../../../assets/users/user-4.png";
import invite from "../../../assets/invite.jpeg";
import plus from "../../../assets/plus.png";
const Participants = props => {
  return (
    <>
      <EventRow>
        <h3>Invited</h3>
        <hr />
      </EventRow>
      <EventRow>
        {/* Shows list of invited users */}
        <div className="event-users">
          <img src={user1} alt="user1" />
          <img src={user2} alt="user2" />
          <img src={user3} alt="user3" />
          <img src={user4} alt="user4" />
          <img src={plus} alt="plus" />
        </div>
        <div className="event-invite">
          {/* Invite more users ui */}
          <img src={invite} alt="invite " />
        </div>
      </EventRow>
      {/* {props.event.attending_users ? (
        <ul>
          {props.event.attending_users.map((user, index) => {
            return <li key={index}>{user.name}</li>;
          })}
        </ul>
      ) : (
        <div />
      )} */}
    </>
  );
};
export default Participants;
