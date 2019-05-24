import React from "react";
import Calendar from "react-calendar";
// import moment from "moment";
import PlacesSearch from "./search/places-search.js";
import { EventBox, EventRow, Inner } from "../../styles/eventStyles";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  onChange = date => this.setState({ date });

  render() {
    return (
      <EventBox>
        {!this.props.event.location ? (
          <div> Loading...</div>
        ) : (
          <Inner>
            <EventRow>
              <h1>Name: {this.props.event.name}</h1>
              <button className="btn-save">Save</button>
            </EventRow>

            <EventRow>
              <h2>Date:</h2>
              <Calendar onChange={this.onChange} value={this.state.date} />
              <span>By Invite Only: {this.props.inviteOnly}</span>
            </EventRow>

            <EventRow>
              <div>
                <h1>Location</h1>
                <PlacesSearch />
              </div>
              <div>
                <img alt="location-image" />
                <h2>{this.props.event.date}</h2>
                <h1>{this.props.event.location.name}</h1>
                {/* <address>{this.props.event.location.address}</address> */}
                <div>Google Map</div>
              </div>
            </EventRow>
          </Inner>
        )}
      </EventBox>
    );
  }
}

export default Info;
