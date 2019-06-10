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
      user_id: null,
      event: {},
      friends: [],
      selectedToInvite: [],
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
          user_id: currentEvent.data.event.organizer,
        });
      } else {
        this.setState({
          event: {},
          user_id: "jNpViqXD4DXmf9H2FbkQnAy30000",
        });
      }
    } catch (e) {
      this.setState({
        event: {},
        user_id: "jNpViqXD4DXmf9H2FbkQnAy30000",
      });
      console.log(e);
    }
  }

  // Reusable axios call to backend api w/ response data set to friends state

  async fetchFriends() {
    let user_id = this.state.user_id;

    try {
      let currentFriends = await axios.get(
        `https://pizza-tim3-be.herokuapp.com/api/friends/${user_id}`
      );
      if (currentFriends) {
        this.setState({
          friends: currentFriends.data,
        });
      } else {
        this.setState({
          friends: [],
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        friends: [],
      });
    }
  }

  // Reusable axios call to backend api w/ response data set to event state

  async componentDidMount() {
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

  render() {
    return (
      <div>
        <Nav />
        {Object.keys(this.state.event).length ? (
          <Inner>
            <Info event={this.state.event} toggleSwitch={this.toggleSwitch} />
            <Participants
              event={this.state.event}
              friends={this.state.friends}
              selectAdditional={this.selectAdditional}
              inviteFriends={this.inviteFriends}
            />
            <Discussion event={this.state.event} user_id={this.state.user_id} />
          </Inner>
        ) : (
          <Inner>
            <div className="loading">
              <img src={loading} alt="loading" />
            </div>
          </Inner>
        )}
      </div>
    );
  }
}

export default EventView;
