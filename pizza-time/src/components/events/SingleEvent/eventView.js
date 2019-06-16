import React from "react";

import Nav from "../../home-header/home-header.js";
import Info from "./info.js";
import axios from "axios";
import Participants from "./participants";
import Discussion from "./discussion";
import { Inner } from "../../../styles/eventStyles";
import loading from "../../../assets/loading.gif";

class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizer: null,
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
          organizer: currentEvent.data.event.organizer,
          loading: false,
        });
      } else {
        this.setState({
          event: {},
          organizer: "jNpViqXD4DXmf9H2FbkQnAy30000",
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        event: {},
        organizer: "jNpViqXD4DXmf9H2FbkQnAy30000",
        loading: false,
      });
      console.log(e);
    }
  }

  // Reusable axios call to backend api w/ response data set to friends state
  async fetchFriends() {
    let organizer = this.state.organizer;
    // Current Invited Friends
    if (organizer) {
      try {
        let currentFriends = await axios.get(
          `https://pizza-tim3-be.herokuapp.com/api/friends/${organizer}`
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
    this.setState({
      loading: true,
    });
    await this.fetchEvent();
    await this.fetchFriends();
  }

  async componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    if (newId !== prevProps.match.params.id) {
      await this.fetchEvent();
      await this.fetchFriends();
    }
  }

  // Select user to be added to an selectedToInvite array that will be post to eventInvited table
  selectAdditional = user => {
    // 1.Select user
    // 2. Check if current this.state.invitedUsers has that user
    // 3. if doesn't add it him to invitedUsers & selected array that will be pushed to backend
    let stateSelected = this.state.selectedToInvite;
    let isDuplicate = this.state.selectedToInvite.filter(
      selectedUser => selectedUser.firebase_uid === user.firebase_uid
    );

    if (isDuplicate.length === 0) {
      stateSelected.push(user);
      this.setState({
        selectedToInvite: stateSelected,
      });
    } else {
      this.setState({
        selectedToInvite: stateSelected,
      });
    }
  };

  // Send the array of the selectedToInvite array to the backend
  inviteFriends = () => {
    let event_id = this.props.match.params.id;
    if (event_id) {
      let currentEvent = this.state.event;

      let selectedToInvite = this.state.selectedToInvite;
      selectedToInvite.map(select => {
        select.accepted = false;
        select.declined = false;
        select.pending = true;
        select.event_id = Number(event_id);
        select.user_id = select.firebase_uid;
      });

      let newInvitedUsers = Array.from(currentEvent.invitedUsers);

      if (selectedToInvite.length !== 0) {
        for (let i = 0; i < selectedToInvite.length; i++) {
          newInvitedUsers.push(selectedToInvite[i]);
        }
      }

      let newUpdatedEvent = {
        id: event_id,
        event_name: currentEvent.event_name,
        event_description: currentEvent.event_description,
        event_date: currentEvent.event_date,
        organizer: currentEvent.organizer,
      };
      axios
        .post(
          `https://pizza-tim3-be.herokuapp.com/api/invited/${event_id}`,
          selectedToInvite
        )

        .then(res => {
          newUpdatedEvent.invitedUsers = newInvitedUsers;

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
  };

  // Toggle the event's inviteOnly property
  toggleSwitch = () => {
    this.setState(prevState => {
      const stateCopy = { ...this.state };
      stateCopy.event.inviteOnly = !prevState.event.inviteOnly;
      return stateCopy;
    });
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
    };
    axios
      .put(
        `https://pizza-tim3-be.herokuapp.com/api/events/${event_id}`,
        updatedEvent
      )
      .then(res => {
        // If response successfull, update the state with the new info
        if (res.status === 200) {
          updatedEvent.invitedUsers = currentEvent.invitedUsers;
          updatedEvent.comments = currentEvent.comments;
          updatedEvent.location = currentEvent.location;
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
  };

  render() {
    return (
      <div>
        <Nav />

        {this.state.loading === true ? (
          <Inner>
            <div className="loading">
              <img src={loading} alt="loading" />
            </div>
          </Inner>
        ) : (
          <Inner>
            <Info
              event={this.state.event}
              toggleSwitch={this.toggleSwitch}
              updateEvent={this.updateEvent}
              updateName={this.updateName}
              updateDate={this.updateDate}
              location={this.location}
            />
            <Participants
              event={this.state.event}
              unInvitedFriends={this.state.unInvitedFriends}
              selectAdditional={this.selectAdditional}
              inviteFriends={this.inviteFriends}
            />
            <Discussion
              event={this.state.event}
              organizer={this.state.organizer}
            />
          </Inner>
        )}
      </div>
    );
  }
}

export default EventView;
