import React from "react";
import Calendar from "react-calendar";
// import PlacesSearch from "../create-new-event/search/places-search";
import calendar from "./../../../assets/calendar.svg";
import edit from "./../../../assets/edit.png";
import clock from "./../../../assets/clock.png";
import moment from "moment";
// import GoogleMap from "./../create-new-event/search/map/map";

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
      time: {
        hour: 0,
        minutes: 0,
        am: "AM",
      },
      show: false,
      google_place_id: "",
      event: {
        event_name: "",
      },
    };
    // React-Bootstraps Toggle modals
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    // Convert response event's date epoch string to UTC format
    const eventDate = new Date(Number(this.props.event.event_date));

    // The following javascript code takes the response's string and extracts event date's hours and minutes
    let eventDateString = eventDate.toString();
    let arr = eventDateString.split("");
    let timeValueArr = arr
      .splice(16)
      .join("")
      .split(":")
      .join("");

    // Event's hour
    let eventHour = timeValueArr.substring(2, 0);
    // Event's minutes
    let eventMinutes = timeValueArr.substring(4, 2);
    // Event's am
    let eventAM = this.state.time.am;

    // Set up the AM or PM depending on the hour
    if (Number(eventHour) < 13) {
      eventAM = "AM";
    } else {
      eventHour = Number(eventHour) - 12;
      eventAM = "PM";
    }

    // Set the states time hour, minutes, am
    this.setState({
      time: {
        hour: eventHour,
        minutes: eventMinutes,
        am: eventAM,
      },
    });

    // Hide edit-time select input on load
    let editTimeHtml = document.getElementsByClassName("edit-time");
    if (editTimeHtml[0]) {
      editTimeHtml[0].style.display = "none";
    }
    // Set the info state's date, eventName and hides headers edit form
    this.setState({
      date: eventDate,
      event: {
        event_name: this.props.event.event_name,
      },
      editForm: false,
    });
  }

  updateTime = e => {
    e.preventDefault();
    // Get the current state date
    const eventDate = new Date(this.state.date);

    // Convert the date to a string
    let currentTime = eventDate.toString();
    // Create an array of characters from the current date string
    let currentTimeArray = currentTime.split("");
    // Create the first part of the string that will be concocted in the final string
    let firstString = eventDate.toString().slice(0, 16);
    // Create a second string in order to obtain the time format,
    let remainingString = currentTimeArray
      .splice(16)
      .join("")
      .split(":")
      .join("");

    // Assign the the time format
    let secondString = remainingString.slice(6);

    let newTime = this.state.time;

    // this.setState({
    //   time: newTime,
    // });

    let modifiedHour = 0;
    if (newTime.am === "PM") {
      modifiedHour = Number(newTime.hour) + 12;
    } else {
      modifiedHour = newTime.hour;
    }
    let updateTime =
      firstString +
      modifiedHour.toString() +
      ":" +
      newTime.minutes +
      ":" +
      "00" +
      secondString;

    this.setState({
      date: new Date(updateTime),
    });

    this.props.updateDate(updateTime);
  };

  // Switch handlers for evnts inviteOnly property
  inviteOnlySwitchHandler = e => {
    this.props.toggleSwitch();
  };
  // Handles when the event's time select is being
  timeOnChange = e => {
    this.setState({
      time: {
        ...this.state.time,
        [e.target.name]: e.target.value,
      },
    });
  };
  // Handles when the event's name select is being
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
  toggleEditTime = () => {
    let editTimeHtml = document.getElementsByClassName("edit-time");
    if (editTimeHtml[0].style.display === "none") {
      editTimeHtml[0].style.display = "flex";
    } else {
      editTimeHtml[0].style.display = "none";
    }
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

  submitUpdateEventHandler = e => {
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
    // Array of hours to display in the select's mapped option values
    let hours = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    // Array of minutes to display in the select's mapped option values
    let minutes = ["00", "15", "30", "45"];
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
                <div>
                  <h1>
                    <b>Event</b>: {this.props.event.event_name}
                  </h1>
                  <button className="edit-header" onClick={this.toggleEdit}>
                    <img src={edit} alt="edit pencil" />
                  </button>
                </div>
              )}
              <button
                className="btn-save"
                type="submit"
                onClick={this.submitUpdateEventHandler}
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
                <div className="calendar-row">
                  <h2>
                    <b>Date</b>:
                    <span>
                      {moment(this.state.date.toISOString()).format("LL")}
                    </span>
                  </h2>
                  <img
                    src={calendar}
                    alt="calendar"
                    onClick={this.handleShow}
                  />
                </div>

                <div className="calendar-row">
                  <h3>
                    <b>Time</b>: {this.state.time.hour}:
                    {this.state.time.minutes} {this.state.time.am}
                  </h3>
                  <img
                    src={clock}
                    alt="edit-time"
                    onClick={this.toggleEditTime}
                  />
                </div>
                <div className="caloendar-row">
                  <div>
                    <span className="edit-time">
                      <div>
                        <select
                          name="hour"
                          value={this.state.time.hour}
                          as="select-hour"
                          onChange={this.timeOnChange}
                        >
                          <option value={this.state.time.hour}>
                            {this.state.time.hour}
                          </option>
                          {hours.map((hour, index) => {
                            if (Number(this.state.time.hour) !== Number(hour)) {
                              return (
                                <option key={index} value={hour}>
                                  {hour}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <select
                          name="minutes"
                          value={this.state.time.minutes}
                          as="select-minutes"
                          onChange={this.timeOnChange}
                        >
                          <option value={this.state.time.minutes}>
                            {this.state.time.minutes}
                          </option>
                          {minutes.map((minute, index) => {
                            if (
                              Number(this.state.time.minutes) !== Number(minute)
                            ) {
                              return (
                                <option key={index} value={minute}>
                                  {minute}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <select
                          onChange={this.timeOnChange}
                          value={this.state.time.am}
                          name="am"
                          as="select-am"
                        >
                          {this.state.time.am === "AM" ? (
                            <>
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </>
                          ) : (
                            <>
                              <option value="PM">PM</option>
                              <option value="AM">AM</option>
                            </>
                          )}
                          })}
                        </select>
                      </div>
                      <button onClick={this.updateTime}>Update Time</button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="invite-switch">
                <h3>By Invite Only: </h3>
                <Toggle>
                  <label className="switch">
                    <input
                      onClick={this.inviteOnlySwitchHandler}
                      type="checkbox"
                    />
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
