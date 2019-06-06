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
      comments: [],
    };
  }

  componentDidMount() {
    let eventsComments = this.props.event.comments;
    this.setState({
      comments: eventsComments,
    });
  }
  submitCommentHandler = e => {
    e.preventDefault();
    // this.props.addComment(this.state.newComment);
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
                      <div className="comment" key={comment.id}>
                        <img src={user1} alt="user" />
                        <p>{comment.message}</p>
                        <div>
                          {comment.user_id === this.props.user_id ? (
                            <div>
                              <img
                                src={edit}
                                alt="edit"
                                // onClick={this.submitCommentHandler}
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
