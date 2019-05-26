import React from "react";
import Calendar from "react-calendar";
import PlacesSearch from "../create-new-event/search/places-search";

import { EventBox, EventRow, Inner, Toggle } from "../../../styles/eventStyles";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  inviteHandler = e => {
    // e.preventDefault();
    this.props.toggleSwitch();
  };
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
              <div className="calendar">
                <h2>Date:</h2>
                <Calendar onChange={this.onChange} value={this.state.date} />
              </div>
              <div className="invite">
                <h2>By Invite Only: </h2>
                <Toggle>
                  <label class="switch">
                    <input onClick={this.inviteHandler} type="checkbox" />
                    <span class="slider" />
                  </label>
                </Toggle>
                {/* <div>
                  <input type="checkbox">
                  <span class="slider round"></span>
                </div> */}
              </div>
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
