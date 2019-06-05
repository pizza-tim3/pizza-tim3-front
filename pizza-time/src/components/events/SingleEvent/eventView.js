import React from "react";

import Nav from "../../home-header/home-header.js";
import Footer from "../../../footer/footer.js";
import Info from "./info.js";
import axios from "axios";
import Participants from "./participants";
import Discussion from "./discussion";
import { Inner } from "../../../styles/eventStyles";

class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      id: null
    };
  }
  
  // Reusable axios call to backend api w/ response data set to event state
  fetchUsers() {
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
    this.fetchUsers();
  }
  
  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id;
    if (newId !== prevProps.match.params.id) {
      this.fetchUsers();
    }
  }
  addUser = user => {
    const stateEvent = { ...this.state.event };
    stateEvent.attending_users.push(user);

    this.setState({
      event: stateEvent
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
            <Discussion event={this.state.event} />
          </Inner>
        ) : (
          <div />
        )}

        <Footer />
      </div>
    );
  }
}

export default EventView;
