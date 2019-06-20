import React from "react";

import { EventRow } from "../../../styles/eventStyles";
import plus from "../../../assets/plus.png";

class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const spans = document.getElementsByClassName("more-user");
    const span = spans[0];
    let close = document.getElementsByClassName("close-more");
    const addUserButton = document.getElementsByClassName("add-user");

    span.style.display = "none";
    span.className = "";

    if (addUserButton[0]) {
      addUserButton[0].onclick = function() {
        if (span.style.display === "none") {
          span.style.display = "flex";
          span.className = "more";
          if (span.style.display === "flex") {
            close[0].onclick = function() {
              span.style.display = "none";
              span.className = "";
            };

            document.onkeydown = function(evt) {
              evt = evt || window.event;
              if (evt.keyCode == 27) {
                span.style.display = "none";
                span.className = "";
              }
            };
          }
        } else {
          span.style.display = "none";
          span.className = "";
        }
      };
    }
  }
  render() {
    return (
      <>
        <EventRow>
          <h3>Invited</h3>
          <hr />
        </EventRow>
        <EventRow>
          {/* Shows list of invited users */}
          <div className="event-users">
            {this.props.event.invitedUsers ? (
              <>
                {this.props.event.invitedUsers.map((invited, index) => {
                  // if (index < 4) {
                  return (
                    <div className="invited" key={invited.firebase_uid}>
                      <img src={invited.avatar} alt={invited.first_name} />
                    </div>
                  );
                  // }
                })}
                <div className="add-user">
                  <button className="action organizer">
                    <img src={plus} alt="plus" />
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </EventRow>
        <div className="more-user">
          {this.props.event ? (
            <>
              <>
                <div className="close">
                  <button className="close-more">
                    <img src={plus} />
                  </button>
                </div>
                {/* Selecte user's friends to an array. User can add the friends to an array that will be sent with post request  to the backend */}
                <div className="friends">
                  {this.props.unInvitedFriends.length > 0 ? (
                    <>
                      {this.props.unInvitedFriends.map((friend, index) => {
                        return (
                          <div
                            className="friend"
                            friend={friend}
                            id={friend.firebase_uid}
                            key={friend.firebase_uid}
                            onClick={() => this.props.selectAdditional(friend)}
                          >
                            <img
                              className="friend-avatar"
                              id={friend.firebase_uid}
                              src={friend.avatar}
                              alt={friend.first_name}
                            />
                            <h4>{friend.first_name}</h4>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <h1>No friends to invite</h1>
                    </>
                  )}
                </div>
                <div className="tobe-invited">
                  <button onClick={this.props.inviteFriends}>Invite</button>
                  {!this.props.additional_friends ? (
                    <></>
                  ) : (
                    <>
                      {this.props.additional_friends.map(friend => {
                        return (
                          <div key={friend.id}>
                            <h2>{friend.id}</h2>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </>
            </>
          ) : (
            <div />
          )}
        </div>
      </>
    );
  }
}
export default Participants;
