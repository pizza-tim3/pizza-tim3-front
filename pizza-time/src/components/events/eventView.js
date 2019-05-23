import React from "react";

import Nav from "../home-header/home-header.js";
import Footer from "../footer/footer.js";
// import PlacesSearch from "./search/places-search.js";
import Info from "./info.js";
// import axios from "axios";
// import Participants from "./../events/participants.js"
// import Discussion from "./../events/discussion.js";
import data from "../../data/data";

class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      inviteOnly: true,
    };
  }
  componentDidMount() {
    // Add axios call for prospective backend api

    // const id = this.props.match.params.id;
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
    const currentEvent = data.filter(event => {
      if (event.id === 2) {
        return true;
      }
    });
    this.setState({
      event: currentEvent[0],
    });
  }
  // onLoad setState to
  // .get('url/events/:id')
  // onClick post or put to ('url/events)

  render() {
    return (
      <div>
        <Nav />
        <Info event={this.state.event} inviteOnly={this.state.inviteOnly} />
        {/* <PlacesSearch /> */}

        {/* <Participants /> */}
        {/* <Discussion /> */}
        <Footer />
      </div>
    );
  }
}

export default EventView;
