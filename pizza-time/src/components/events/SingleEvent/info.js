import React from "react";
import Calendar from "react-calendar";
// import PlacesSearch from "../create-new-event/search/places-search";
import calendar from "./../../../assets/calendar.svg";
import edit from "./../../../assets/edit.png";
import moment from "moment";
import GoogleMap from "./../create-new-event/search/map/map";

import {
  EventBox,
  EventRow,
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
      google_place_id: "",
      event: {
        event_name: "",
      },
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    // Convert response event's date epoch string to UTC format
    const eventDate = new Date(Number(this.props.event.event_date));
    // let location_id = this.props.event.location.google_place_id;
    this.setState({
      date: eventDate,
      // google_place_id: location_id,
      event: {
        event_name: this.props.event.event_name,
      },
      editForm: false,
    });
  }
  // Switch handlers for evnts inviteOnly property
  inviteHandler = e => {
    this.props.toggleSwitch();
  };

  inputOnChange = e => {
    this.setState({
      event: {
        [e.target.name]: e.target.value,
      },
    });
  };
  toggleEdit = () => {
    this.setState(prevState => {
      const stateCopy = { ...this.state };
      stateCopy.editForm = !prevState.editForm;
      return stateCopy;
    });
  };
  updateNameHandler = e => {
    e.preventDefault();
    this.props.updateName(this.state.event.event_name);
    this.setState({
      editForm: false,
    });
  };
  updateDateHandler = e => {
    e.preventDefault();
    this.props.updateDate(this.state.date);
    this.setState({ show: false });
  };
  updateEventHandler = e => {
    e.preventDefault();
    this.props.updateEvent(this.props.event.id);
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
        {Object.keys(this.props.event).length ? (
          <EventBox>
            <div className="event-header">
              {this.state.editForm === true ? (
                <>
                  <input
                    name="event_name"
                    type="text"
                    value={this.state.event.event_name}
                    placeholder={this.state.event.event_name}
                    onChange={this.inputOnChange}
                  />
                  <button onClick={this.toggleEdit}>Cancel</button>
                  <button onClick={this.updateNameHandler}> Update</button>
                </>
              ) : (
                <h1>
                  <b>Event</b>: {this.props.event.event_name}
                  <button className="edit-header" onClick={this.toggleEdit}>
                    <img src={edit} alt="edit pencil" />
                  </button>
                </h1>
              )}
              <button
                className="btn-save"
                type="submit"
                onClick={this.updateEventHandler}
              >
                Save
              </button>
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

                  <button className="btn-save" onClick={this.updateDateHandler}>
                    Save
                  </button>
                </Modal.Footer>
              </Modal>
              <div className="calendar">
                <h2>
                  <b>Date</b>:
                  <span>
                    {moment(this.state.date.toISOString()).format("LLLL")}
                  </span>
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
                    {this.props.event.location ? (
                      <h4>Place: {this.props.event.location.id}</h4>
                    ) : (
                      <></>
                    )}
                    {/* <address>{this.props.event.location.address}</address> */}
                  </div>
                </div>

                <div className="event map">
                  {/* <GoogleMap getId={this.state.google_place_id} /> */}
                </div>
              </EventRow>
            </EventColumn>
          </EventBox>
        ) : (
          <div> Loading...</div>
        )}
      </EventBox>
    );
  }
}

export default Info;
