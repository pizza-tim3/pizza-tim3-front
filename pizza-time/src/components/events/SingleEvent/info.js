import React from "react";
import Calendar from "react-calendar";
import PlacesSearch from "../create-new-event/search/places-search";
import calendar from "./../../../assets/calendar.svg";
import {
  EventBox,
  EventRow,
  Inner,
  Toggle,
  EventColumn,
} from "../../../styles/eventStyles";
import { Modal } from "react-bootstrap";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    // if (this.props.event !== "undefined") {
    const eventDate = new Date(this.props.event.event_date);
    console.log(eventDate);
    this.setState({
      date: eventDate,
    });
    // }
  }
  // Switch handlers for evnts inviteOnly property
  inviteHandler = e => {
    this.props.toggleSwitch();
  };
  // Hides the modal
  handleClose() {
    this.setState({ show: false });
  }
  // Shows the modal
  handleShow() {
    this.setState({ show: true });
  }
  // Handles calendar's date state
  onChange = date => this.setState({ date });

  render() {
    return (
      <EventBox>
        {!this.props.event ? (
          <div> Loading...</div>
        ) : (
          <EventBox>
            <div className="event-header">
              <h1>
                <b>Event</b>: {this.props.event.name}
              </h1>
              <button className="btn-save">Save</button>
            </div>

            <EventRow className="event-date">
              {/* Modal */}
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                  <h1>Pick a date:</h1>
                  {/* Calendar */}
                  <Calendar
                    id="calendar"
                    onChange={this.onChange}
                    value={this.state.date}
                  />
                </Modal.Body>
                <Modal.Footer>
                  {/* Close Calendar */}

                  <button className="btn-save" onClick={this.handleClose}>
                    Save
                  </button>
                </Modal.Footer>
              </Modal>
              <div className="calendar">
                <h2>
                  <b>Date</b>:<span>{this.state.date.toISOString()}</span>
                </h2>
                <img src={calendar} alt="calendar" onClick={this.handleShow} />
              </div>
              <div className="invite-switch">
                <h3>By Invite Only: </h3>
                <Toggle>
                  <label className="switch">
                    <input onClick={this.inviteHandler} type="checkbox" />
                    <span className="slider" />
                  </label>
                </Toggle>
              </div>
            </EventRow>

            <EventColumn>
              <EventRow className="event-location">
                <h1>Location</h1>
                <input placeholder="search" />
                {/* <PlacesSearch /> */}
              </EventRow>
              <EventRow>
                <div className="event location">
                  <img
                    alt="location"
                    src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.scandichotels.com%2Fimagevault%2Fpublishedmedia%2Fqn6infvg30381stkubky%2Fscandic-sundsvall-city-restaurant-verket-10.jpg&f=1"
                  />
                  <div>
                    <h4>Place: {this.props.event.location.name}</h4>
                    <address>{this.props.event.location.address}</address>
                  </div>
                </div>
                <div className="event map">
                  <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fgeoinfoindia.files.wordpress.com%2F2015%2F04%2Fgoogle-map.jpg&f=1" />
                </div>
              </EventRow>
            </EventColumn>
          </EventBox>
        )}
      </EventBox>
    );
  }
}

export default Info;
