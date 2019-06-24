import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../home-header/home-header.js";
import Info from "./info.js";
import axios from "axios";
import Participants from "./participants";
import Discussion from "./discussion";
import { Inner } from "../../../styles/eventStyles";
import loading from "../../../assets/loading.gif";
import missing from "../../../assets/404.jpg";
// import { func } from "prop-types";

class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      friends: [],
      unInvitedFriends: [],
      selectedToInvite: [],
      loading: false,
    };
  }

  async fetchEvent() {
    const currentId = this.props.match.params.id;
    try {
      let currentEvent = await axios.get(
        `https://pizza-tim3-be.herokuapp.com/api/events/${currentId}/details`
      );
      if (currentEvent) {
        this.setState({
          event: currentEvent.data.event,
          loading: false,
        });
      } else {
        this.setState({
          event: {},
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        event: {},
        loading: false,
      });
      console.log(e);
    }
  }

  // Reusable axios call to backend api w/ response data set to friends state
  async fetchFriends() {
    // Current Invited Friends

    if (this.props.userReducer.firebase_uid) {
      try {
        let currentFriends = await axios.get(
          `https://pizza-tim3-be.herokuapp.com/api/friends/${
            this.props.userReducer.firebase_uid
          }`
        );
        if (currentFriends) {
          // Set friends's state to current data in the databse
          this.setState({
            friends: currentFriends.data,
          });
          let allFriends = this.state.friends;
          let currentInvited = this.state.event.invitedUsers;
          // Filter through the invited users array and the friends array. Return array of users that are not invited.
          for (var i = 0; i < currentInvited.length; i++) {
            for (var j = 0; j < allFriends.length; j++) {
              if (
                currentInvited[i].firebase_uid === allFriends[j].firebase_uid
              ) {
                allFriends = allFriends
                  .slice(0, j)
                  .concat(allFriends.slice(j + 1, allFriends.length));
              }
            }
          }
          this.setState({
            unInvitedFriends: allFriends,
          });
        }
      } catch (e) {
        console.log(e);
        this.setState({
          unInvitedFriends: [],
          friends: [],
          loading: false,
        });
      }
    }
  }

  // Reusable axios call to backend api w/ response data set to event state

  async componentDidMount() {
    //Set loading
    this.setState({
      loading: true,
    });
    // Fetch event
    await this.fetchEvent();
    // Fetch friends
    await this.fetchFriends();

    // Set the switch button className depending on the event's inviteOnly setting
    let switchButton = document.getElementsByClassName("switch")[0];

    if (switchButton) {
      if (this.state.event.inviteOnly === false) {
        switchButton.className = "";
        switchButton.className = "switch inviteFalse";
      } else {
        switchButton.className = "";
        switchButton.className = "switch inviteTrue";
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    if (newId !== prevProps.match.params.id) {
      await this.fetchEvent();
      await this.fetchFriends();
    }
    const currentUser = this.props.userReducer.firebase_uid;
    if (currentUser === this.state.event.organizer) {
      await this.fetchFriends();
    }
  }

  // Select user to be added to an selectedToInvite array that will be post to eventInvited table
  selectAdditional = user => {
    // Add/Remove css on select/unselect
    let friendAvatars = document.getElementsByClassName("friend-avatar");
    let invitedFriends = Array.from(friendAvatars).filter(
      avatar => avatar.id === user.firebase_uid
    );
    if (invitedFriends[0]) {
      if (invitedFriends[0].className !== "friend-avatar friend-invited") {
        invitedFriends[0].className = "";
        invitedFriends[0].className = "friend-avatar friend-invited";
      } else {
        invitedFriends[0].className = "";
        invitedFriends[0].className = "friend-avatar";
      }
    }
    // 1.Select user
    // 2. Check if current this.state.invitedUsers has that user
    // 3. if doesn't add it him to invitedUsers & selected array that will be pushed to backend

    let currentSelected = this.state.selectedToInvite;
    let newSelected = [];
    // Return an array if user already selected

    if (currentSelected.length === 0) {
      newSelected.push(user);
      this.setState({
        selectedToInvite: newSelected,
      });
    } else {
      let duplicateArray = currentSelected.filter(
        selectedUser => selectedUser.firebase_uid === user.firebase_uid
      );
      let clean = currentSelected.filter(
        selectedUser => selectedUser.firebase_uid !== user.firebase_uid
      );
      let newClean = currentSelected.filter(
        selectedUser => selectedUser.firebase_uid !== user.firebase_uid
      );
      if (duplicateArray.length === 0) {
        newClean.push(user);
        let dodo = Array.from(newClean);
        this.setState({
          selectedToInvite: dodo,
        });
      } else {
        this.setState({
          selectedToInvite: clean,
        });
      }
    }
  };

  // Send the array of the selectedToInvite array to the backend
  inviteFriends = () => {
    let event_id = this.props.match.params.id;
    let stateSelected = this.state.selectedToInvite;
    let currentEvent = this.state.event;
    let currentInvited = this.state.event.invitedUsers;

    if (event_id) {
      stateSelected.map(select => {
        select.accepted = false;
        select.declined = false;
        select.pending = true;
        select.event_id = Number(event_id);
        select.user_id = select.firebase_uid;
      });
    }

    if (stateSelected.length !== 0) {
      for (let i = 0; i < stateSelected.length; i++) {
        currentInvited.push(stateSelected[i]);
      }
      if (currentInvited.length !== stateSelected.length) {
        let newUpdatedEvent = {
          id: event_id,
          event_name: currentEvent.event_name,
          event_description: currentEvent.event_description,
          event_date: currentEvent.event_date,
          organizer: currentEvent.organizer,
          invitedUsers: currentEvent.invitedUsers,
          inviteOnly: currentEvent.inviteOnly,
        };
        axios
          .post(
            `https://pizza-tim3-be.herokuapp.com/api/invited/${event_id}`,
            stateSelected
          )

          .then(res => {
            newUpdatedEvent.invitedUsers = currentInvited;

            this.setState({
              event: newUpdatedEvent,
              selectedToSubmit: [],
            });
          })
          .catch(e => {
            console.log(e);
            this.setState({
              event: currentEvent,
              selectedToSubmit: [],
            });
          });
      }
    }
  };

  // Toggle the event's inviteOnly property
  toggleSwitch = () => {
    this.setState(prevState => {
      const stateCopy = { ...this.state };
      stateCopy.event.inviteOnly = !prevState.event.inviteOnly;
      return stateCopy;
    });

    let switchButton = document.getElementsByClassName("switch")[0];

    if (this.state.event.inviteOnly === false) {
      switchButton.className = "switch inviteTrue";
    } else {
      switchButton.className = "";
      switchButton.className = "switch inviteFalse";
    }
  };

  // Update the state's event name
  updateName = name => {
    let currentEvent = this.state.event;
    currentEvent.event_name = name;
    this.setState({
      event: currentEvent,
    });
  };

  // Update the state's date name
  updateDate = date => {
    let currentEvent = this.state.event;
    currentEvent.event_date = new Date(date).getTime().toString();
    this.setState({
      id: currentEvent.id,
      comments: currentEvent.comments,
      event_name: currentEvent.event_name,
      event_description: currentEvent.event_description,
      event_date: currentEvent.event_date,
      invitedUsers: currentEvent.invitedUsers,
      organizer: currentEvent.organizer,
    });
  };

  // Update the entire event with the event's data using axios call
  location = location => {
    let currentEvent = this.state.event;
    console.log(
      `State id before the click: ${this.state.event.location.google_place_id}`
    );

    console.log(`Value being passed: ${location}`);
    this.setState({
      event: {
        id: currentEvent.id,
        comments: currentEvent.comments,
        event_name: currentEvent.event_name,
        event_description: currentEvent.event_description,
        event_date: currentEvent.event_date,
        invitedUsers: currentEvent.invitedUsers,
        organizer: currentEvent.organizer,
        location: {
          id: currentEvent.location.id,
          google_place_id: location.toString(),
        },
      },
    });
    console.log(
      `State id after click: ${this.state.event.location.google_place_id}`
    );
  };
  updateEvent = event_id => {
    this.setState({
      loading: true,
    });

    let currentFriends = this.state.friends;
    let currentEvent = this.state.event;

    let updatedEvent = {
      id: event_id,
      event_name: currentEvent.event_name,
      event_description: currentEvent.event_description,
      event_date: currentEvent.event_date,
      organizer: currentEvent.organizer,
      location: currentEvent.location,
      inviteOnly: currentEvent.inviteOnly,
    };
    console.log(updatedEvent);
    axios
      .put(
        `https://pizza-tim3-be.herokuapp.com/api/events/${event_id}`,
        updatedEvent
      )
      .then(res => {
        // If response successfull, update the state with the new info
        // console.log(res);
        console.log(res.config.data);
        if (res.status === 200) {
          updatedEvent.invitedUsers = currentEvent.invitedUsers;
          updatedEvent.comments = currentEvent.comments;
          updatedEvent.location = currentEvent.location;
          updatedEvent.inviteOnly = currentEvent.inviteOnly;

          this.setState({
            event: updatedEvent,
            loading: false,
            friends: currentFriends,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
    let switchButton = document.getElementsByClassName("switch")[0];

    if (this.state.event.inviteOnly === false) {
      switchButton.className = "switch inviteTrue";
    } else {
      switchButton.className = "";
      switchButton.className = "switch inviteFalse";
    }
  };

  // Delete event

  deleteEvent = event_id => {
    // Get current event and set state to loading
    let currentEvent = this.state.event;
    this.setState({
      loading: true,
    });
    // Make a delete call to backend
    axios
      .delete(`https://pizza-tim3-be.herokuapp.com/api/events/${event_id}`)

      .then(res => {
        if (res) {
          this.setState({
            event: [],
            loading: false,
          });
        } else {
          this.setState({
            event: currentEvent,
            loading: false,
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({
          event: currentEvent,
          loading: false,
        });
      });
  };

  render() {
    return (
      <div className="event-view">
        <Nav />

        {this.state.loading === true ? (
          <Inner>
            <div className="loading">
              <img src={loading} alt="loading" />
            </div>
          </Inner>
        ) : (
          <>
            {Object.keys(this.state.event).length ? (
              <Inner>
                <Info
                  event={this.state.event}
                  toggleSwitch={this.toggleSwitch}
                  updateEvent={this.updateEvent}
                  updateName={this.updateName}
                  updateDate={this.updateDate}
                  location={this.location}
                  deleteEvent={this.deleteEvent}
                />
                <Participants
                  event={this.state.event}
                  unInvitedFriends={this.state.unInvitedFriends}
                  selectAdditional={this.selectAdditional}
                  inviteFriends={this.inviteFriends}
                />

                <Discussion event={this.state.event} />
              </Inner>
            ) : (
              <>
                <h1 className="missing">Event? What event?</h1>
                <Inner>
                  <img src={missing} alt="dog eating a pizza" />
                </Inner>
              </>
            )}
          </>
        )}
      </div>
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
  )(EventView)
);
