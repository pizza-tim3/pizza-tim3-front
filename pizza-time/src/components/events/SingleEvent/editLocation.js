import React from "react";
import UpdatePlacesSearch from "../create-new-event/search/edit-places-search";
import { Modal } from "react-bootstrap";
import searchmap from "./../../../assets/searchmap.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import update from "./../../../assets/update.png";
import cancel from "./../../../assets/cancel.svg";

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
      place_id: this.props.event.location,
    });
  }
  // Choose location on click and update the state's id
  chooseLocation = id => {
    this.setState({
      place_id: id,
    });
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
