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

    try {
      let currentFriends = await axios.get(
        `https://pizza-tim3-be.herokuapp.com/api/friends/${organizer}`
      );
      if (currentFriends) {
        this.setState({
          friends: currentFriends.data,
          loading: false,
        });
      } else {
        this.setState({
          friends: [],
          loading: false,
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        friends: [],
        loading: false,
      });
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
    let currentInvited = this.state.event.invitedUsers;
    let selected = [];
    let duplicate = true;
    for (let i = 0; i < currentInvited.length; i++) {
      if (currentInvited[i].user_id === user.firebase_uid) {
        duplicate = true;
      } else {
        duplicate = false;
      }
    }
    // Add the user only if the user is not currently invited (i.e. duplicate)
    if (duplicate === false) {
      currentInvited.push(user);
      selected.push(user);
      this.setState({
        event: {
          invitedUsers: currentInvited,
        },
        selectedToInvite: selected,
      });
    }
  };

  // Send the array of the selectedToInvite array to the backend
  inviteFriends = () => {
    const event_id = this.props.match.params.id;

    let selectedToSubmit = this.state.selectedToInvite.map(select => {
      select.event_id = event_id;
      select.user_id = select.user_id;
      select.avatar = select.avatar;
      select.first_name = select.first_name;
      select.last_name = select.last_name;
      select.pending = "true";
      select.accepted = "false";
      select.declined = "false";
    });

    // If selected array is not empty, update the event's invitedUsers with new selected users
    if (selectedToSubmit.length > 0) {
      let newInvitedUsers = this.state.event.invitedUsers;
      for (let i = 0; i < selectedToSubmit.length; i++) {
        newInvitedUsers.push(selectedToSubmit[i]);
      }
      axios
        .post(
          `https://pizza-tim3-be.herokuapp.com/api/invited/${event_id}`,
          selectedToSubmit
        )
        .then(res => {
          if (res.status === 200) {
            this.setState({
              event: {
                invitedUsers: newInvitedUsers,
              },
              selectedToSubmit: [],
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
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
    console.log(this.state.event);
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
            />
            <Participants
              event={this.state.event}
              friends={this.state.friends}
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
