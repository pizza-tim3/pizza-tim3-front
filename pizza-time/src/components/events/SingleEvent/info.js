import React from "react";
import Calendar from "react-calendar";
import calendar from "./../../../assets/calendar.svg";
import edit from "./../../../assets/edit.png";
import trash from "./../../../assets/trash.png";
import update from "./../../../assets/update.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import orangeupdate from "./../../../assets/orangeupdate.png";
import clock from "./../../../assets/clock.png";
import cancel from "./../../../assets/cancel.svg";
import moment from "moment";
import Details from "./../../events/details-request/details-request";
// import GoogleMap from "./../create-new-event/search/map/map";

import {
  EventBox,
  EventRow,
  Toggle,
  EventColumn,
} from "../../../styles/eventStyles";
import { Modal } from "react-bootstrap";
import EditLocation from "./editLocation";

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
      eventForm: false,
      google_place_id: "",
      eventName: "",
      lat: 0,
      lng: 0,
      location: {
        address: {
          street: "",
          city: "",
        },
        name: "",
        hours: [],
        photo: "",
      },
    };
    // React-Bootstraps Toggle modals
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    let eventDate = new Date(Number(this.props.event.event_date));
    if (this.props.event.location) {
      this.setState({
        google_place_id: this.props.event.location.google_place_id,
      });
    }

    let inputCheckBox = document.getElementsByClassName("switch-button")[0];
    let slider = document.getElementsByClassName("slider")[0];
    let switchButton = document.getElementsByClassName("switch")[0];

    if (inputCheckBox && slider) {
      if (this.props.event.inviteOnly === true) {
        switchButton.className = "";
        switchButton.className = "switch inviteTrue";
      } else {
        switchButton.className = "";
        switchButton.className = "switch inviteFalse";
      }
    }
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

    // Hide edit-time select input on load
    let editTimeHtml = document.getElementsByClassName("edit-time");
    if (editTimeHtml[0]) {
      editTimeHtml[0].style.display = "none";
    }

    this.setState({
      date: eventDate,
      editForm: false,
      time: {
        hour: eventHour,
        minutes: eventMinutes,
        am: eventAM,
      },
    });
    // Set the info state's date, eventName and hides headers edit form
  }
  updateLocation = location => {
    this.props.location(location);
  };
  updateTime = e => {
    e.preventDefault();
    // Get the current state date
    const eventDate = new Date(this.state.date);
    let editTime = document.getElementsByClassName("edit-time");
    editTime[0].style.display = "none";
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
  getDetails = req => {
    let locationHours = req.opening_hours.weekday_text;
    // Google's get image url function
    let bigLeague = req.photos[0].getUrl();

    let cutOff = ", ";
    let streetCutOffIndex = req.formatted_address.indexOf(cutOff);
    let streetString = req.formatted_address.slice(0, streetCutOffIndex);
    let addressString = req.formatted_address.slice(streetString.length + 1);

    this.setState({
      // google_place_id: req.place_id,
      eventName: this.props.event.event_name,
      location: {
        address: {
          street: streetString,
          city: addressString,
        },
        hours: locationHours,
        name: req.name,
        photo: bigLeague,
        lat: req.geometry.location.lat,
        lng: req.geometry.location.lng,
      },
    });
  };
  // Switch handlers for evnts inviteOnly property
  inviteOnlySwitchHandler = e => {
    e.preventDefault();
    if (this.props.event.organizer && this.props.userReducer.firebase_uid) {
      if (this.props.event.organizer === this.props.userReducer.firebase_uid) {
        this.props.toggleSwitch();
      }
    }
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
      eventName: e.target.value,
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
    if (this.props.event.organizer === this.props.userReducer.firebase_uid) {
      let editTimeHtml = document.getElementsByClassName("edit-time");
      if (editTimeHtml[0].style.display === "none") {
        editTimeHtml[0].style.display = "flex";
      } else {
        editTimeHtml[0].style.display = "none";
      }
    }
  };
  updateNameHandler = e => {
    e.preventDefault();
    this.setState({
      editForm: false,
    });
    this.props.updateName(this.state.eventName);
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
                <div className="header-edit">
                  <input
                    name="name"
                    type="text"
                    value={this.state.eventName}
                    placeholder={this.state.eventName}
                    onChange={this.inputOnChange}
                  />

                  <button
                    className="action organizer cancel"
                    onClick={this.toggleEdit}
                  >
                    <img src={cancel} alt="cancel" />
                  </button>
                  <button className="btn-save" onClick={this.updateNameHandler}>
                    {" "}
                    Update
                  </button>
                </div>
              ) : (
                <div className="event-name">
                  <h1>
                    <b>Event</b>: <span>{this.state.eventName}</span>
                  </h1>
                  {this.props.userReducer.firebase_uid ===
                  this.props.event.organizer ? (
                    <div>
                      <button
                        className="action organizer"
                        onClick={this.toggleEdit}
                      >
                        <img src={edit} alt="edit pencil" />
                      </button>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              )}
              <div>
                {this.props.userReducer.firebase_uid ===
                this.props.event.organizer ? (
                  <div>
                    <button
                      className="btn-save action organizer"
                      type="submit"
                      onClick={this.submitUpdateEventHandler}
                    >
                      Save
                    </button>
                    <button
                      className="action organizer trash"
                      onClick={() =>
                        this.props.deleteEvent(this.props.event.id)
                      }
                    >
                      <img src={trash} alt="trash" />
                    </button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
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

                  {this.props.userReducer.firebase_uid ===
                  this.props.event.organizer ? (
                    <img
                      src={calendar}
                      alt="calendar"
                      onClick={this.handleShow}
                      className="action organizer"
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <div className="calendar-row">
                  <h3>
                    <b>Time</b>: {this.state.time.hour}:
                    {this.state.time.minutes} {this.state.time.am}
                  </h3>
                  {this.props.userReducer.firebase_uid ===
                  this.props.event.organizer ? (
                    <img
                      src={clock}
                      alt="edit-time"
                      onClick={this.toggleEditTime}
                      className="action organizer"
                    />
                  ) : (
                    <></>
                  )}
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
                      <button
                        className="action organizer"
                        onClick={this.updateTime}
                      >
                        <img src={update} alt="edit" />
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="invite-switch">
                <h3>By Invite Only: </h3>
                <Toggle>
                  <label className="switch">
                    <input
                      className="switch-button"
                      onClick={this.inviteOnlySwitchHandler}
                      type="checkbox"
                    />
                    <span className="slider" />
                  </label>
                </Toggle>
              </div>
            </EventRow>

            <EventColumn className="location-info">
              <EventRow>
                {this.state.location ? (
                  <div className="event-location-name">
                    <h2>Place: {this.state.location.name}</h2>
                  </div>
                ) : (
                  <>
                    <h2>Place: </h2>
                  </>
                )}

                <EditLocation
                  event={this.props.event}
                  updateLocation={this.updateLocation}
                />
              </EventRow>
              <EventRow>
                <div className="event location">
                  {this.state.location ? (
                    <>
                      <img alt="location" src={this.state.location.photo} />
                      <div className="location-address">
                        <h2>Address:</h2>
                        <address>
                          <p>{this.state.location.address.street}</p>
                          <p>{this.state.location.address.city}</p>
                        </address>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="event map">
                  {this.state.google_place_id ? (
                    <>
                      <Details
                        getDetails={this.getDetails}
                        placeId={this.state.google_place_id}
                        lat={this.state.lat}
                        lng={this.state.lng}
                      />
                      {this.state.location ? (
                        <div className="location-hours">
                          <h2>Hours: </h2>
                          <div>
                            {this.state.location.hours.map((hour, index) => {
                              return <div key={index}>{hour}</div>;
                            })}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
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

const mstp = ({ userReducer /**,otherReducer */ }) => {
  return { userReducer };
};
export default withRouter(
  connect(
    mstp,
    {}
  )(Info)
);
