import React from "react";
import { EventRow } from "../../../styles/eventStyles";
import user1 from "../../../assets/users/user-1.png";
import axios from "axios";
import plus from "../../../assets/plus.png";
import edit from "../../../assets/edit.png";
import remove from "../../../assets/delete.png";

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        message: "",
      },
      editComment: {
        update: "",
      },
      comments: [],
    };
  }

  componentDidMount() {
    // Set the component's comments state to the passed props
    let eventsComments = this.props.event.comments;
    this.setState({
      comments: eventsComments,
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
    // console.log(comments);
    Array.from(comments).map(comment => {
      comment.style.display = "none";
    });
    Array.from(actionButtons).map(comment => {
      comment.style.display = "none";
    });
    console.log(comments);

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
      user_id: this.props.user_id,
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

  submitCommentHandler = e => {
    e.preventDefault();
    this.setState({
      newComment: {
        message: "",
      },
    });
  };

  addComment = () => {
    // Copy the current state event

    let event_id = this.props.event.id;
    let newComment = this.state.newComment;

    // Add event id, user_id and time to the new comment
    newComment.event_id = event_id;
    newComment.user_id = this.props.user_id;
    newComment.time = new Date();

    axios
      .post(
        `https://pizza-tim3-be.herokuapp.com/api/events/${event_id}/comments`,
        newComment
      )
      .then(res => {
        if (res) {
          // If successfull push new comments to front-end state
          newComment.id = res.data[0];
          this.setState(state => {
            return {
              comments: [...state.comments, newComment],
              newComment: {
                message: "",
              },
            };
          });
        }
      })
      .catch(err => {
        this.setState({
          event: {},
        });
      });
  };

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
                  {this.state.comments.map((comment, index) => {
                    return (
                      <div className="comment" id={comment.id} key={comment.id}>
                        <img src={user1} alt="user" className="user-avatar" />
                        <p id={`comment-${comment.id}`}>{comment.message}</p>

                        <div
                          id={`edit-comment-${comment.id}`}
                          className="edit-comment"
                        >
                          <input
                            id={`edit-comment-input-${comment.id}`}
                            className="edit-comment-input"
                            value={this.state.editComment.update}
                            name="update"
                            onChange={this.updateOnChange}
                          />
                          <img
                            src={plus}
                            alt="update"
                            onClick={() => this.updateComment(comment.id)}
                          />
                        </div>

                        <div>
                          {comment.user_id === this.props.user_id ? (
                            <div
                              id={`action-button-${comment.id}`}
                              className="action-buttons"
                            >
                              <img
                                src={edit}
                                alt="edit"
                                onClick={() => this.selectComment(comment.id)}
                              />
                              <img
                                src={remove}
                                alt="delete"
                                onClick={() => this.deleteComment(comment.id)}
                              />
                            </div>
                          ) : (
                            <div />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="add-comments">
                  <input
                    name="message"
                    value={this.state.newComment.message}
                    onChange={this.commentOnChange}
                  />
                  <img src={plus} alt="plus" onClick={this.addComment} />
                </div>
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

export default Discussion;
