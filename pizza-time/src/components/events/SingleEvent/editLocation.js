import React from "react";
import UpdatePlacesSearch from "../create-new-event/search/edit-places-search";
import { Modal } from "react-bootstrap";
import searchmap from "./../../../assets/searchmap.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class EditLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place_id: "",
      show: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this.setState({
      place_id: this.props.event.place,
    });
  }
  // Choose location on click and update the state's id
  chooseLocation = (id, place) => {
    this.setState({
      place_id: id,
    });
    // Toggle css based on the id selected
    let locationHtml = Array.from(document.getElementsByClassName("card"));
    let selectedLocation = document.getElementById(id);
    locationHtml.map(location => {
      location.className = "";
      location.className = "card";
    });
    selectedLocation.className = "card active-location";
  };
  // Hide the modal

  handleClose() {
    this.setState({ show: false });
  }
  // Shows the modal
  handleShow() {
    this.setState({ show: true });
  }
  // updateLocationHandler
  updateLocationHandler = e => {
    e.preventDefault();
    let currentId = this.state.place_id;
    this.setState({
      place_id: currentId,
    });
    this.props.updateLocation(currentId);
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <UpdatePlacesSearch chooseLocation={this.chooseLocation} />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn-save" onClick={this.updateLocationHandler}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
        <button id="search-map-icon" className="action organizer">
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
