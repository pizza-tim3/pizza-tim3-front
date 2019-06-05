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
    };
  }

  submitCommentHandler = e => {
    e.preventDefault();
    this.props.addComment(this.state.newComment);
    this.setState({
      newComment: {
        message: "",
      },
    });
  };

  // commentOnChange = newComment => this.setState({ newComment });
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
                  {this.props.event.comments.map(comment => {
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
                                // onClick={this.submitCommentHandler}
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
                  <img
                    src={plus}
                    alt="plus"
                    onClick={this.submitCommentHandler}
                  />
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
