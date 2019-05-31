import React from "react";

import Nav from "../../home-header/home-header.js";
import Footer from "../../footer/footer.js";
import Info from "./info.js";
// import axios from "axios";
import Participants from "./participants";
import Discussion from "./discussion";
import data from "../../../data/data";
import { Inner } from "../../../styles/eventStyles";
class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      id: null,
    };
  }

  componentDidMount() {
    // Add axios call for prospective backend api

    // axios
    // .get(`https://pizza-tim3-be.herokuapp.com/api/events/${id}`)
    // .then(response => {
    // })
    // .catch(err => {
    // this.setState({
    //   event: data,
    // });
    // });

    // Map through events and set the state to the response
    const currentId = this.props.match.params.id;
    // console.log(currentId);
    // console.log(data);/
    const currentEvent = data.filter(
      event => Number(event.id) === Number(currentId)
    );
    this.setState({
      event: currentEvent[0],
      id: currentId,
    });
    // console.log(this.state.event);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const newId = this.props.match.params.id;
    if (newId !== prevProps.match.params.id) {
      const currentEvent = data.filter(event => {
        if (Number(event.id) === Number(newId)) {
          return true;
        }
      });
      this.setState({
        event: currentEvent[0],
        id: newId,
      });
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
  // onClick put to ('url/events)

  render() {
    return (
      <div>
        <Nav />
        {this.state.event ? (
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
