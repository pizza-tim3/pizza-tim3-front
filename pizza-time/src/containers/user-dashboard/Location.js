import React from "react";
import Details from "../.././components/events/details-request/details-request.js";


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
  }

  getLocation = req => {
    console.log("HERE IS TYHE LOCATION REQ", req);
    console.log("HERE IS TYHE LOCATION Name", req.name);
    this.setState({ location: req.name });
  };

  render() {
    if (this.state.location.length != 0) {
      return <div>{this.state.location}</div>;
    } else {
      return (
        <Details
          getDetails={this.getLocation}
          placeId={this.props.google_place_id}
        />
      );
    }
  }
}

export default Location;
