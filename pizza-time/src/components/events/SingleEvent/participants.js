import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { EventRow } from "../../../styles/eventStyles";
import plus from "../../../assets/plus.png";
import { Modal } from "react-bootstrap";

class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showMoreUsers: false,
    };
    this.handleShowMoreUsers = this.handleShowMoreUsers.bind(this);
    this.handleCloseMoreUsers = this.handleCloseMoreUsers.bind(this);
  }

  // hideMoreUsers modal
  handleCloseMoreUsers() {
    this.setState({ showMoreUsers: false });
  }
  // showMoreUsers modal
  handleShowMoreUsers() {
    this.setState({ showMoreUsers: true });
  }
  inviteFriendsHandler() {
    this.props.inviteFriends();
    this.setState({ showMoreUsers: false });
  }
  render() {
    return (
      <>
        <EventRow>
          <Modal
            show={this.state.showMoreUsers}
            onHide={this.handleCloseMoreUsers}
          >
            <Modal.Footer>
              {/* Close More Users */}
              <button
                className="btn-close action"
                onClick={this.handleCloseMoreUsers}
              >
                <img src={plus} alt="close" />
              </button>
            </Modal.Footer>
            <Modal.Body>
              <div className="more-user">
                {this.props.event ? (
                  <>
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
                                onClick={() =>
                                  this.props.selectAdditional(friend)
                                }
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
                      <button
                        className="action"
                        onClick={() => this.inviteFriendsHandler()}
                      >
                        <img alt="invite plus sign" src={plus} />
                      </button>
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
                ) : (
                  <div />
                )}
              </div>
            </Modal.Body>
          </Modal>
        </EventRow>
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
                  if (index < 3) {
                    return (
                      <div className="invited" key={invited.firebase_uid}>
                        <img src={invited.avatar} alt={invited.first_name} />
                      </div>
                    );
                  }
                })}
                <div className="total-users">
                  <span>
                    <p>{this.props.event.invitedUsers.length}</p>
                  </span>
                  going
                </div>
                {this.props.userReducer.firebase_uid ===
                this.props.event.organizer ? (
                  <div className="add-user">
                    <button
                      onClick={this.handleShowMoreUsers}
                      className="action organizer"
                    >
                      <img src={plus} alt="plus" />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </EventRow>
      </>
    );
  }
}
const mstp = ({ userReducer /**,otherReducer */ }) => {
  return { userReducer };
};
export default withRouter(
  connect(
    mstp,
    {}
  )(Participants)
);
