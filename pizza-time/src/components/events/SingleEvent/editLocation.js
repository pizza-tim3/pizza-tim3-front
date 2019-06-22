import React from "react";
// import PlacesSearch from "../create-new-event/search/places-search";
import { Modal } from "react-bootstrap";
import searchmap from "./../../../assets/searchmap.png";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import GoogleMap from "../create-new-event/search/map/map";
// import orangeupdate from "./../../../assets/orangeupdate.png";
// import fakemap from "./../../../assets/fakemap.png";
// import cancel from "./../../../assets/cancel.svg";
// import Details from "./../../events/details-request/details-request";
// import GoogleMap from "./../create-new-event/search/map/map";

class EditLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLocation: "ChIJTY1v-SidQIYRWe-hzXZT5jk",
      show: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  // Shows the modal
  handleShow() {
    this.setState({ show: true });
  }
  updateLocationHandler = e => {
    e.preventDefault();
    console.log("editLocation's state: " + this.state.newLocation);
    // this.props.updateLocation(this.state.newLocation);
  };
  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>{/* <PlacesSearch /> */}</Modal.Body>
          <Modal.Footer>
            <button className="btn-save" onClick={this.updateLocationHandler}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
        <button className="action organizer">
          {this.props.userReducer.firebase_uid ===
          this.props.event.organizer ? (
            <img src={searchmap} alt="edit" onClick={this.handleShow} />
          ) : (
            <></>
          )}
        </button>
      </>
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
  )(EditLocation)
);
