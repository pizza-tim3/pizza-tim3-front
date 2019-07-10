import React from "react";
import { EventRow } from "../../../styles/eventStyles";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import plus from "../../../assets/plus.png";
import moment from "moment";
import update from "../../../assets/update.png";
import edit from "../../../assets/edit.png";
import cancel from "../../../assets/cancel.svg";

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        message: "",
      },
      avatar: "",
      editComment: {
        update: "",
      },
      comments: [],
      commentError: false,
    };
  }

  componentDidMount() {
    // Set the component's comments state to the passed props
    let eventsComments = this.props.event.comments;

    this.setState({
      comments: eventsComments,
    });

    let currentAvatar = this.props.userReducer.avatar;
    this.setState({
      avatar: currentAvatar,
    });

    let comments = document.getElementsByClassName("edit-comment");
    Array.from(comments).map(comment => {
      comment.style.display = "none";
    });
  }

  // Select comment to be edited
  selectComment = comment_id => {
    let comments = document.getElementsByClassName("edit-comment");
    let actionButtons = document.getElementsByClassName("action-buttons");
    let currentActionButton = document.getElementById(
      `action-button-${comment_id}`
    );
    Array.from(comments).map(comment => {
      comment.style.display = "none";
    });
    Array.from(actionButtons).map(comment => {
      comment.style.display = "none";
    });

    currentActionButton.style.display = "flex";
    let selectedMessageHtml = document.getElementById(`comment-${comment_id}`);
    let selectedMessage = selectedMessageHtml.innerHTML;
    let selectedComment = document.getElementById(`edit-comment-${comment_id}`);
    selectedComment.style.display = "flex";
    this.setState({
      editComment: {
        update: selectedMessage,
      },
    });

    selectedMessageHtml.style.display = "none";
  };

  // Update selected comment
  updateComment = comment_id => {
    // Create an updated comment object
    let updatedMessage = this.state.editComment.update;
    let updatedComment = {
      id: comment_id,
      user_id: this.props.user,
      message: updatedMessage,
    };

    // Put axios call
    axios
      .put(
        `https://pizza-tim3-be.herokuapp.com/api/comments/${comment_id}`,
        updatedComment
      )
      .then(res => {
        if (res) {
          let comments = document.getElementsByClassName("edit-comment");
          let selectedMessageHtml = document.getElementById(
            `comment-${comment_id}`
          );
          // Display the message html
          selectedMessageHtml.style.display = "flex";
          // Update the message in the html if the call was successfull
          selectedMessageHtml.innerHTML = updatedComment.message;
          // Hide Editing Display
          Array.from(comments).map(comment => {
            comment.style.display = "none";
          });
          // Show actions (edit, delete) buttons
          let actionButtons = document.getElementsByClassName("action-buttons");
          Array.from(actionButtons).map(button => {
            button.style.display = "flex";
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Comment edit form handler
  submitCommentHandler = e => {
    e.preventDefault();
    this.setState({
      newComment: {
        message: "",
      },
    });
  };

  // Add comment using axios call
  addComment = () => {
    // Create a comment object that will be posted to the route
    let newComment = this.state.newComment;
    newComment.event_id = this.props.event.id;
    newComment.user_id = this.props.userReducer.firebase_uid;
    newComment.time = new Date();
    if (this.state.newComment.message.length > 2) {
      axios
        .post(
          `https://pizza-tim3-be.herokuapp.com/api/events/${
            this.props.event.id
          }/comments`,
          newComment
        )
        .then(res => {
          if (res.status === 201) {
            // If successfull push new comments to front-end state
            newComment.id = res.data[0];
            newComment.avatar = this.props.userReducer.avatar;

            this.setState(state => {
              return {
                comments: [...state.comments, newComment],
                newComment: {
                  message: "",
                },
                commentError: false,
              };
            });
          }
        })
        .catch(err => {
          this.setState({
            event: {},
          });
        });
    } else {
      this.setState({
        commentError: true,
      });
    }
  };
  // Delete comment using axios
  deleteComment = comment_id => {
    let currentComments = this.state.comments;
    axios
      .delete(`https://pizza-tim3-be.herokuapp.com/api/comments/${comment_id}`)
      .then(res => {
        if (res) {
          // If successfull push new comments to front-end state
          let newComments = currentComments.filter(
            comment => comment.id !== comment_id
          );
          this.setState({
            comments: newComments,
          });
        }
      })
      .catch(err => {
        this.setState({
          event: {},
        });
      });
  };

  commentOnChange = e => {
    this.setState({
      newComment: {
        ...this.state.newComment,
        [e.target.name]: e.target.value,
      },
    });
    if (this.state.newComment.message.length > 2) {
      this.setState({
        commentError: false,
      });
    }
  };

  updateOnChange = e => {
    this.setState({
      editComment: {
        ...this.state.editComment,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <div>
        <EventRow>
          <h3>Discussion</h3>
          <hr />
        </EventRow>
        <EventRow className="event-discussion">
          <>
            {Object.keys(this.props.event).length ? (
              <div className="event-comments">
                <div className="all-comments">
                  {this.state.comments ? (
                    <>
                      {this.state.comments.map((comment, index) => {
                        // if (comment.user_id !== null) {
                        return (
                          <div key={index}>
                            <div
                              className="comment"
                              id={comment.id}
                              user_id={comment.user_id}
                            >
                              <img
                                src={comment.avatar}
                                alt="user"
                                className="user-avatar"
                              />
                              <div>
                                <p id={`comment-${comment.id}`}>
                                  {comment.message}
                                </p>
                              </div>

                              <div
                                id={`edit-comment-${comment.id}`}
                                className="edit-comment"
                              >
                                <input
                                  id={`edit-comment-input-${comment.id}`}
                                  className="edit-comment-input orange-form"
                                  value={this.state.editComment.update}
                                  name="update"
                                  onChange={this.updateOnChange}
                                />
                                <button className="action update">
                                  <img
                                    src={update}
                                    alt="update"
                                    onClick={() =>
                                      this.updateComment(comment.id)
                                    }
                                  />
                                </button>
                              </div>

                              {this.props.userReducer.firebase_uid ? (
                                <>
                                  {comment.user_id ===
                                  this.props.userReducer.firebase_uid ? (
                                    <div
                                      id={`action-button-${comment.id}`}
                                      className="action-buttons"
                                    >
                                      <button className="action">
                                        <img
                                          src={edit}
                                          alt="edit"
                                          onClick={() =>
                                            this.selectComment(comment.id)
                                          }
                                        />
                                      </button>
                                      <button className="action cancel">
                                        <img
                                          src={cancel}
                                          alt="delete"
                                          onClick={() =>
                                            this.deleteComment(comment.id)
                                          }
                                        />
                                      </button>
                                    </div>
                                  ) : (
                                    <div />
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <p className="comment-date">
                              {moment(new Date(comment.time)).fromNow()}
                            </p>
                          </div>
                        );
                        // }
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="add-comments">
                  <input
                    placeholder="new comment"
                    className="orange-form"
                    name="message"
                    value={this.state.newComment.message}
                    onChange={this.commentOnChange}
                  />
                  <button className="action">
                    <img src={plus} alt="plus" onClick={this.addComment} />
                  </button>
                </div>
                {this.state.commentError && (
                  <span className="comment-error">
                    Message empty or too short.
                  </span>
                )}
              </div>
            ) : (
              <>Loading</>
            )}
          </>
        </EventRow>
      </div>
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
  )(Discussion)
);
