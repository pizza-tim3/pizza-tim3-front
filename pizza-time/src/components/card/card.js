import React from "react";
import axios from "axios";

import Comment from "../../assets/comment.svg";
import { CardBox, Inner, Content, Action } from "../../styles/cardStyles.js";
import { Link } from "react-router-dom";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showMessages: false,
      attendees: [],
      showActions: this.props.showActions,
    };
  }

  componentDidMount() {
    const eventId = this.props.event.event_id;

    axios
      .get(
        `https://pizza-tim3-be.herokuapp.com/api/comments/event/messages/user/${
          this.props.event.event_id
        }`
      )
      .then(res => {
        this.setState({ comments: res.data.comments });
      })
      .catch(error => {
        this.setState({ error });
      });
    axios
      .get(
        `https://pizza-tim3-be.herokuapp.com/api/invited/${
          this.props.event.event_id
        }`
      )
      .then(res => {
        this.setState({ attendees: res.data });
      });
  }

  commentHandler = event => {
    event.preventDefault();
    const show = !this.state.showMessages;
    this.setState({showMessages:show})


  };
  //use for accepting an invitation
  clickHandler = event => {
    event.preventDefault();
    const id = localStorage.getItem("userFireBaseId");
    const event_id = event.target.getAttribute("event_id");
    const user_id = event.target.getAttribute("user_id");
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Accepted",
    };

    axios
      .put(
        `https://pizza-tim3-be.herokuapp.com/api/events/status/${id}`,
        newItem
      )
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  //use for declining an invitation
  ButtonHandler = event => {
    event.preventDefault();
    const id = localStorage.getItem("userFireBaseId");
    const event_id = event.target.getAttribute("event_id");
    const user_id = event.target.getAttribute("user_id");
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Declined",
    };
    axios
      .put(
        `https://pizza-tim3-be.herokuapp.com/api/events/status/${id}`,
        newItem
      )
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const eventDate = parseInt(this.props.event.event_date);
    const date = new Date(eventDate).toString().substring(0, 15);
    const event_id = this.props.event.event_id;

    //console.log("COME FOR THE EVENT", this.props.event);
    return (
      <CardBox>
        <Inner>
          <Link id={this.props.event.event_id} to={"/event/" + event_id}>
            <Content>
              <div className="content">
                <p>
                  <span>Name:</span>{this.props.event.event_name}
                </p>
                <p>
                  <span>Date:</span>{date}
                </p>
                <p>
                  <span>Location:</span>{this.props.event.location}
                </p>
                <p>
                  <span>Attending:</span>
                  {this.state.attendees.map(attende => {
                    return [
                      attende.first_name,
                      "  ",
                      attende.last_name,
                      ",",
                      " ",
                    ];
                  })}
                </p>
              </div>
            </Content>
          </Link>

          <Action>
            <div className="comment">
              <img src={Comment} onClick={this.commentHandler} />
              {/* {(false && <DashComment/> )}  */}
              <p>{this.state.comments.length}</p>
              <div className="message" />
              
              {this.state.comments.map(comment => {
                if (this.state.showMessages) {
                  // return <DashComment key={comment.id} comment={comment} />;
                  return (
                    <div>
                      <b>{comment.first_name}</b>{" "}
                      {comment.time.substring(0, 15)}
                      <br />
                      <i> {comment.message}</i>
                      <br />
                    </div>
                  );
                }
              })}
            </div>
            {["a"].map(x => {
              if (this.state.showActions) {
                return (
                  <div className="buttons">
                    <div className="share-socials">
                      <FacebookShareButton
                        url={window.location.href}
                        media={this.props.event.event_name}
                        className="button"
                      >
                        <FacebookIcon size={32} round={false} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={window.location.href}
                        media={this.props.event.event_name}
                        className="button"
                      >
                        <TwitterIcon size={32} round={false} />
                      </TwitterShareButton>
                    </div>
                    <button
                      onClick={this.clickHandler}
                      event_id={this.props.event.event_id}
                      // this event is the object eventhaving all attributes:name,date
                      user_id={this.props.event.user_id}
                    >
                      Let's Go!
                    </button>
                    <button
                      onClick={this.ButtonHandler}
                      event_id={this.props.event.event_id}
                      user_id={this.props.event.user_id}
                    >
                      Not This Time
                    </button>
                  </div>
                );
              }
            })}
          </Action>
        </Inner>
      </CardBox>
    );
  }
}

export default Card;
