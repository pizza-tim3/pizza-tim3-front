import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { EventRow } from "../../../styles/eventStyles";
import plus from "../../../assets/plus.png";
import searchusers from "../../../assets/searchusers.png";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showMoreUsers: false,
      showAllUsers: false,
    };
    this.handleShowMoreUsers = this.handleShowMoreUsers.bind(this);
    this.handleCloseMoreUsers = this.handleCloseMoreUsers.bind(this);
    this.handleShowAllUsers = this.handleShowAllUsers.bind(this);
    this.handleCloseAllUsers = this.handleCloseAllUsers.bind(this);
  }

  // showAllUsers modal
  handleShowAllUsers() {
    this.setState({ showAllUsers: true });
  }
  handleCloseAllUsers() {
    this.setState({ showAllUsers: false });
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
    this.setState({ showMoreUsers: false, showAllUsers: false });
  }
  render() {
    return (
      <>
        <EventRow>
          <Modal
            show={this.state.showAllUsers}
            onHide={this.handleCloseAllUsers}
          >
            <Modal.Footer>
              {/* Close More Users */}
              <button
                className="btn-close action"
                onClick={this.handleCloseAllUsers}
              >
                <img src={plus} alt="close" />
              </button>
            </Modal.Footer>
            <Modal.Body>
              <h2>All Invited</h2>

              <div className="friends">
                {!this.props.invitedUsers ? (
                  <></>
                ) : (
                  <>
                    {this.props.invitedUsers.map(friend => {
                      return (
                        <div
                          className="friend"
                          friend={friend}
                          id={friend.firebase_uid}
                          key={friend.firebase_uid}
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
                )}
              </div>
            </Modal.Body>
          </Modal>

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
                          <button
                            className="action"
                            onClick={() => this.inviteFriendsHandler()}
                          >
                            <img alt="invite plus sign" src={plus} />
                          </button>
                        </>
                      ) : (
                        <>
                          <h2>No friends to invite</h2>
                          <Link to={"/profile"} className="action organizer">
                            <img src={searchusers} className="dada" />
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="tobe-invited">
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
                <div className="total-users" onClick={this.handleShowAllUsers}>
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
