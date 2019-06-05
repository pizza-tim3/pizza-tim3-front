import React from "react";
import { EventRow } from "../../../styles/eventStyles";
import user1 from "../../../assets/users/user-1.png";

class Discussion extends React.Component {
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
                {this.props.event.comments.map((comment, index) => {
                  return (
                    <div className="comment" key={index}>
                      <img src={user1} alt="user" />
                      <p>{comment.message}</p>
                    </div>
                  );
                })}
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
