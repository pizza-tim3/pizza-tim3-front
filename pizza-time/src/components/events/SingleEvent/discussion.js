import React from "react";
import { EventRow } from "../../../styles/eventStyles";

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  render() {
    return (
      <div>
        <EventRow className="event-invited">
          <h3>Discussion</h3>
          <hr />
        </EventRow>
      </div>
    );
  }
}

export default Discussion;
