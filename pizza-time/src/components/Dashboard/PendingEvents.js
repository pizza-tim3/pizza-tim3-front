import React from "react";
import axios from "axios";

class PendingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickHandler = event => {
    event.preventDefault();
    const event_id = event.target.getAttribute("event_id");
    const user_id = event.target.getAttribute("user_id");
    // console.log("Event id and user id ", event_id, user_id);
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Accepted"
    };
    // console.log("Event neing posted ", newItem);

    axios
      .put("http://localhost:5500/api/events/status/1", newItem)
      .then(res => {
        console.log("New Item is updated now", res.data.results);
        window.location.reload();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  ButtonHandler = event => {
    event.preventDefault();
    const event_id = event.target.getAttribute("event_id");
    const user_id = event.target.getAttribute("user_id");
    // console.log("Eventid and UserId are", event_id, user_id);
    const newItem = {
      event_id: event_id,
      user_id: user_id,
      status: "Declined"
    };
    axios
      .put("http://localhost:5500/api/events/status/1", newItem)
      .then(res => {
        // console.log("Response for Decline", res.data.results);
        window.location.reload();
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  render() {
    // console.log(this.props);
    var date = new Date(this.props.event.event_date).toString();
    return (
      <div>
        <div> {this.props.event.event_name}</div>
        <div>{date}</div>
        <div>{this.props.event.event_id}</div>
        <button
          onClick={this.clickHandler}
          event_id={this.props.event.event_id} // this event is the object eventhaving all attributes:name,date
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
}

export default PendingEvents;
