import React from "react";

import Nav from "../home-header/home-header.js";
import Footer from "../footer/footer.js";
import PlacesSearch from "./search/places-search.js";
import Info from "./../events/info.js";
// import Participants from "./../events/participants.js"
// import Discussion from "./../events/discussion.js";

const EventView = () => {
  // onLoad setState to
  // .get('url/events/:id')
  // onClick post or put to ('url/events)

  return (
    <div>
      <Nav />
      <Info />
      {/* <PlacesSearch /> */}

      {/* <Participants /> */}
      {/* <Discussion /> */}
      <Footer />
    </div>
  );
};

export default EventView;
