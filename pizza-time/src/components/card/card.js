import React from "react";
import axios from "axios";

import Envelope from "../../assets/envelope.svg";
import Comment from "../../assets/comment.svg";
import { CardBox, Inner, Content, Action } from "../../styles/cardStyles.js";
import Location from "../../containers/user-dashboard/Location.js";
import { bold } from "ansi-colors";
import {Link}  from "react-router-dom";

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
    //console.log("REACHED HERE");
    const eventId= this.props.event.event_id

    axios
      .get(`https://pizza-tim3-be.herokuapp.com/api/comments/event/messages/user/${this.props.event.event_id}`)
      .then(res => {
        console.log("COUNT COMMENT RESPONSE", res);
        this.setState({ comments: res.data.comments });
      })
      .catch(error => {
        this.setState({ error });
      });
    axios.get(`https://pizza-tim3-be.herokuapp.com/api/invited/${this.props.event.event_id}`).then(res => {
      console.log("INVITEES RESPONSE", res);
      this.setState({ attendees: res.data });
    });
  }

  commentHandler = event => {
    event.preventDefault();
    const show = !this.state.showMessages;
    console.log("Show message now : ", show)
    this.setState({showMessages:show})


  };
  //use for accepting an invitation
  clickHandler = event => {
    event.preventDefault();
    const id = localStorage.getItem("userFireBaseId");
    const event_id = event.target.getAttribute("event_id");
    const user_id = event.target.getAttribute("user_id");
    console.log("Event id and user id ", event_id, user_id);
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Accepted"
    };
    console.log("Event neing posted ", newItem);

    axios
      .put(`https://pizza-tim3-be.herokuapp.com/api/events/status/${id}`, newItem)
      .then(res => {
        console.log("New Item is updated now", res.data.results);
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
    console.log("Eventid and UserId are", event_id, user_id);
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Declined"
    };
    axios
      .put(`https://pizza-tim3-be.herokuapp.com/api/events/status/${id}`, newItem)
      .then(res => {
        console.log("Response for Decline", res.data.results);
        window.location.reload();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const eventDate = parseInt(this.props.event.event_date);
    const date = new Date(eventDate).toString().substring(0,15);
    const event_id = this.props.event.event_id;
    
    //console.log("COME FOR THE EVENT", this.props.event);
    return (
      <CardBox>
        <Inner>
        <Link id={this.props.event.event_id} to={"/event/" + event_id} >
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
                
              </p>
              <p> <b>
                <span>Attending:</span>
              
                {this.state.attendees.map(attende => {
                  return [attende.first_name, "  ", attende.last_name, ","," "]
                })}
             </b> </p>
             
              
            </div>  
          </Content>
          </Link>

          <Action>
            <div className="comment">
              <img src={Comment} onClick={this.commentHandler} />
              {/* {(false && <DashComment/> )}  */}
              <p>{this.state.comments.length}</p>
              <div claasName="message" />

              {this.state.comments.map(comment => {
                if (this.state.showMessages) {
                  // return <DashComment key={comment.id} comment={comment} />;
                   console.log("COMMENT TIME")
                  return (
                   
                    <div>
                    <b>{comment.first_name}</b>{" "}{comment.time.substring(0,15)}<br/>
                     
                    <i> {comment.message }</i>
                    <br/>
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
