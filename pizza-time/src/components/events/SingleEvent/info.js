import React from "react";
import Calendar from "react-calendar";
import PlacesSearch from "../create-new-event/search/places-search";
import calendar from "./../../../assets/calendar.svg";
import { EventBox, EventRow, Inner, Toggle } from "../../../styles/eventStyles";
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
        {!this.props.event.location ? (
          <div> Loading...</div>
        ) : (
          <Inner>
            <EventRow>
              <h1>Name: {this.props.event.name}</h1>
              <button className="btn-save">Save</button>
            </EventRow>

            <EventRow>
              {/* Modal */}
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Pick a date</Modal.Title>
                </Modal.Header>
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
                  <button variant="secondary" onClick={this.handleClose}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
              <div className="calendar">
                <h2>
                  Date:
                  <img
                    src={calendar}
                    alt="calendar"
                    onClick={this.handleShow}
                  />
                </h2>
              </div>
              <div className="invite">
                <h2>By Invite Only: </h2>
                <Toggle>
                  <label className="switch">
                    <input onClick={this.inviteHandler} type="checkbox" />
                    <span className="slider" />
                  </label>
                </Toggle>
              </div>
            </EventRow>

            <EventRow>
              <div>
                <h1>Location</h1>
                <PlacesSearch />
              </div>
              <div>
                <img alt="location" />
                <h2>{this.props.event.date}</h2>
                <h1>{this.props.event.location.name}</h1>

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