import React from "react";

import Nav from "../../home-header/home-header.js";
import Footer from "../../footer/footer.js";
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
      event: {},
      friends: [],
      user_id: "jNpViqXD4DXmf9H2FbkQnAy30000",
    };
  }

  // Reusable axios call to backend api to fetch all friends for the current user

  // fetchFriendsByUsersId(firebase_uid) {
  //   axios
  //     .get(`https://pizza-tim3-be.herokuapp.com//api/friends/${firebase_uid}/`)
  //     .then(response => {
  //       this.setState({
  //         friends: response.data.friends,
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({
  //         friends: {},
  //       });
  //     });
  // }

  // Reusable axios call to backend api w/ response data set to state's event

  fetchEvent() {
    const currentId = this.props.match.params.id;

    axios
      .get(
        `https://pizza-tim3-be.herokuapp.com/api/events/${currentId}/details`
      )
      .then(response => {
        this.setState({
          event: response.data.event,
        });
      })
      .catch(err => {
        this.setState({
          event: {},
        });
      });
  }
  componentDidMount() {
    this.fetchEvent();
  }
  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    if (newId !== prevProps.match.params.id) {
      this.fetchEvent();
    }
  }
  addUser = user => {
    const stateEvent = { ...this.state.event };
    stateEvent.attending_users.push(user);

    this.setState({
      event: stateEvent,
    });
  };
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
            <Participants addUser={this.addUser} event={this.state.event} />
            <Discussion event={this.state.event} user_id={this.state.user_id} />
          </Inner>
        ) : (
          <div>
            <img src={loading} alt="loading" />
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default EventView;
