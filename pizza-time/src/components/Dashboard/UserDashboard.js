import React from "react";
import axios from "axios";
import PendingEvents from "./PendingEvents.js";
import UpcomingEvents from "./UpcomingEvents.js";
import PastEvents from "./PastEvents.js";

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingEvents: [],
      upcomingEvents: [],
      pastEvents: [],
      selectedTab: "PendingEvents" //"UpcomingEvents", "PastEvents"
    };
  }
 
  upcomingHandler = event => {
    event.preventDefault();

    axios
      .get("http://localhost:5500/api/events/upcoming/jNpViqXD4DXmf9H2FbkQnAy10000")
      .then(res => {
        console.log("Response for UpcomingEvents", res);
        this.setState({
          upcomingEvents: res.data.result,
          selectedTab: "UpcomingEvents"
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  pendingHandler = event => {
    axios
      .get("http://localhost:5500/api/events/pending/jNpViqXD4DXmf9H2FbkQnAy10000")
      .then(res => {
        console.log("RESPONSE OF PENDING EVENTS", res);
        this.setState({
          pendingEvents: res.data.result,
          selectedTab: "PendingEvents"
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  pastHandler = event => {
    event.preventDefault();
    axios
      .get("http://localhost:5500/api/events/past/jNpViqXD4DXmf9H2FbkQnAy10000")
      .then(res => {
        console.log("RESPONSE OF PAST EVENTS", res);
        this.setState({
          pastEvents: res.data.result,
          selectedTab: "PastEvents"
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    if (this.state.selectedTab == "PendingEvents") {
      return (
        <div>
          <button onClick={this.upcomingHandler}>Upcoming</button>
          <button onClick={this.pendingHandler}>Pending</button>
          <button onClick={this.pastHandler}>Past</button>

          {this.state.pendingEvents.map(event => {
            return <PendingEvents key={event.id} event={event} />;
          })}
        </div>
      );
    } else if (this.state.selectedTab == "UpcomingEvents") {
      return (
        <div>
          <button onClick={this.upcomingHandler}>Upcoming</button>
          <button onClick={this.pendingHandler}>Pending</button>
          <button onClick={this.pastHandler}>Past</button>
          {this.state.upcomingEvents.map(event => {
            return <UpcomingEvents key={event.id} event={event} />;
          })}
          }
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.upcomingHandler}>Upcoming</button>
          <button onClick={this.pendingHandler}>Pending</button>
          <button onClick={this.pastHandler}>Past</button>
          {this.state.pastEvents.map(event => {
            return <PastEvents key={event.id} event={event} />;
          })}
          }
        </div>
      );
    }
  }
}

export default UserDashboard;
