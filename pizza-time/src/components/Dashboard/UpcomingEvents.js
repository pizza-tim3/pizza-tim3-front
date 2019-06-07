import React from "react";
import axios from "axios";

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UpcomingEvents: []
    };
  }
  //   clickHandler = event => {
  //     event.preventDefault();
  //     //const event_id=event.target.getAttribute("event_id")
  //     // const user_id= event.target.getAttribute("user_id")
  //     axios
  //       .get("http://localhost:5500/api/events/upcomingevents/1")
  //       .then(res => {
  //         console.log("Response for UpcomingEvents", res);
  //         this.setState({ UpcomingEvents: res.data });
  //       })
  //       .catch(error => {
  //         this.setState({ error });
  //       });
  //   };

  
  render() {
    return (
      <div>
        <div> {this.props.event.event_name}</div>
        <div>{this.props.event.event_date}</div>
        <div>{this.props.event.event_id}</div>
        <div>Google Place : {this.props.event.google_place_id}</div>
      </div>
    );
  }
}
export default UpcomingEvents;
