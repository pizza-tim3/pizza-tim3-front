import React from "react";
import { EventRow } from "../../../styles/eventStyles";
import user1 from "../../../assets/users/user-1.png";

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    // const id = this.props.params.match.id;
    // const currentEvent = data.filter(event => event.id === id);
    // const eventsComments = this.props.event.comments;
    // if (eventsComments) {
    //   this.setState({ comments: eventsComments });
    // }
    // console.log(this.props);
  }
  render() {
    return (
      <div>
        <EventRow>
          <h3>Discussion</h3>
          <hr />
        </EventRow>
        <EventRow className="event-discussion">
          <>
            {this.props.event.comments ? (
              <div className="event-comments">
                {this.props.event.comments.map((comment, index) => {
                  return (
                    <div className="comment" key={index}>
                      <img src={user1} alt="user" />
                      <p>{comment.comment}</p>
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
