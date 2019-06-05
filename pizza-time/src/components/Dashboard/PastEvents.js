import React from "react";
import axios from "axios";

class PastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>{this.props.event.event_name}</div>
        <div>{this.props.event.event_date}</div>
        <div>{this.props.event.event_id}</div>
        <div>{this.props.event.google_place_id}</div>
      </div>
    );
  }
}

export default PastEvents;
