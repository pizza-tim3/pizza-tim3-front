import React from "react";
import Calendar from "react-calendar";
import moment from "moment";
import PlacesSearch from "./search/places-search.js";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  onChange = date => this.setState({ date });

  render() {
    // console.log(this.props.event.attending_users);
    return (
      <div>
        {!this.props.event.location ? (
          <div> Loading...</div>
        ) : (
          <div>
            <div>
              <h1>{this.props.event.name}</h1>
              <button>Save</button>
            </div>

            <div>
              <h2>Date:</h2>
              <Calendar onChange={this.onChange} value={this.state.date} />
              <span>By Invite Only: {this.props.inviteOnly}</span>
            </div>

            <div>
              <div>
                <h1>Location</h1>
                {/* <PlacesSearch /> */}
              </div>
              <div>
                <img alt="location-image" />
                <h2>{this.props.event.date}</h2>
                <h2>{this.props.event.location.name}</h2>
                {/* <address>{this.props.event.location.address}</address> */}
                <div>Google Map</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Info;
