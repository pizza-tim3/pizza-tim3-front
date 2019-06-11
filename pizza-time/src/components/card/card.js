import React from "react";
import axios from "axios";

import Envelope from "../../assets/envelope.svg";
import Comment from "../../assets/comment.svg";
import { CardBox, Inner, Content, Action } from "../../styles/cardStyles.js";
import DashComment from "../../containers/user-dashboard/DashComment";
import Location from "../../containers/user-dashboard/Location.js";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showComments: true,
      attendees: []
    };
  }

  componentDidMount() {
    console.log("REACHED HERE");
    const eventId= this.props.event.event_id

    axios
      .get("http://localhost:5500/api/comments/event/messages/user/" + this.props.event.event_id)
      .then(res => {
        console.log("COUNT COMMENT RESPONSE", res);
        this.setState({ comments: res.data.comments });
      })
      .catch(error => {
        this.setState({ error });
      });
    axios.get("http://localhost:5500/api/invited/" + this.props.event.event_id).then(res => {
      console.log("INVITEES RESPONSE", res);
      this.setState({ attendees: res.data });
    });
  }

  commentHandler = event => {
    event.preventDefault();
    let myElements = event.target;
    /*
     * make a new class noMessage which has display as none.
     *
     */
    if (this.state.showComments) {
      myElements.classList.remove("noMessage");
    } else {
      myElements.classList.add("noMessage");
    }
    //this.setState({ showComments: !showComments });
  };

  render() {
    const date = new Date(this.props.event.event_date).toString();
    console.log("COME FOR THE EVENT", this.props.event);
    return (
      <CardBox>
        <Inner>
          <Content>
            <img src={Envelope} />
            <div className="content">
              <p>
                <span>Name:</span> {this.props.event.event_name}{" "}
              </p>
              <p>
                <span>Date:</span> {date}
              </p>
              <p>
                <span>location:</span>{" "}
                <Location google_place_id={this.props.event.google_place_id} />
              </p>
              <p>
                <span>Attending:</span>
                {this.state.attendees.map(attende => {
                  return [attende.first_name, " ", attende.last_name, ","];
                })}
              </p>
            </div>
          </Content>
          <Action>
            <div className="comment">
              <img src={Comment} onClick={this.commentHandler} />
              <p>{this.state.comments.length}</p>
              <div claasName="message" />

              {this.state.comments.map(comment => {
                return <DashComment key={comment.id} comment={comment} />;
              })}
            </div>
            <div className="buttons">
              <button>Let's Go!</button>
              <button>Not This Time</button>
            </div>
          </Action>
        </Inner>
      </CardBox>
    );
  }
}

export default Card;
