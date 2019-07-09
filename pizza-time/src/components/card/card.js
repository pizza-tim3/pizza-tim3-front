import React from "react";
import axios from "axios";

import Envelope from "../../assets/envelope.svg";
import Comment from "../../assets/comment.svg";
import { CardBox, Inner, Content, Action } from "../../styles/cardStyles.js";
//import DashComment from "../../containers/user-dashboard/DashComment";
import Location from "../../containers/user-dashboard/Location.js";
import { bold } from "ansi-colors";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showMessages: false,
      attendees: [],
      showActions : this.props.showActions
    };
  }


  componentDidMount() {
    const eventId= this.props.event.event_id

    axios
      .get("http://localhost:5500/api/comments/event/messages/user/" + this.props.event.event_id)
      .then(res => {
        this.setState({ comments: res.data.comments });
      })
      .catch(error => {
        this.setState({ error });
      });
    axios.get("http://localhost:5500/api/invited/" + this.props.event.event_id).then(res => {
      this.setState({ attendees: res.data });
    });
  }

  commentHandler = event => {
    event.preventDefault();
    
    const show = !this.state.showMessages;
    this.setState({showMessages:show})


  };
  clickHandler = event => {
    event.preventDefault();
    const id = localStorage.getItem("userFireBaseId");
    const event_id = event.target.getAttribute("event_id");
    const user_id = event.target.getAttribute("user_id");
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Accepted"
    };

    axios
      .put(`http://localhost:5500/api/events/status/${id}`, newItem)
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  ButtonHandler = event => {
    event.preventDefault();
    const id = localStorage.getItem("userFireBaseId");
    const event_id = event.target.getAttribute("event_id");
    const user_id = event.target.getAttribute("user_id");
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Declined"
    };
    axios
      .put(`http://localhost:5500/api/events/status/${id}`, newItem)
      .then(res => {
        window.location.reload();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const date = new Date(this.props.event.event_date).toString().substring(0,15);
    
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
                <span>Date:</span>{date}
              </p>
              <p>
                <span>location:</span>{" "} {this.props.event.location}
                {/* <Location google_place_id={this.props.event.google_place_id} /> */}
              </p>
              <p> <b>
                <span>Attending:</span>
              
                {this.state.attendees.map(attende => {
                  return [attende.first_name, "  ", attende.last_name, ","," "]
                })}
             </b> </p>
            </div>
          </Content>
          <Action>
            <div className="comment">
              <img src={Comment} onClick={this.commentHandler} />
              {/* {(false && <DashComment/> )}  */}
              <p>{this.state.comments.length}</p>
              <div claasName="message" />

              {this.state.comments.map(comment => {
                if (this.state.showMessages) {
                  // return <DashComment key={comment.id} comment={comment} />;
                  return (
                   
                    <div>
                    <b>{comment.first_name}</b>{comment.time}<br/>
                     
                    <b> {comment.message }</b>
                    </div>          
                  )
                } 
              })}
            </div>
            {
              
             ['a'].map( x => {
                  if (this.state.showActions) {
                    return (  
                      <div className="buttons">
                        <button onClick={this.clickHandler}event_id={this.props.event.event_id}
                         // this event is the object eventhaving all attributes:name,date
                          user_id={this.props.event.user_id}>Let's Go!</button>
                        <button  onClick={this.ButtonHandler}
                                 event_id={this.props.event.event_id}
                                 user_id={this.props.event.user_id}>Not This Time</button>
                      </div>);
                  }
              })
            }
          </Action>
        </Inner>
      </CardBox>
    );
  }

}

export default Card;
