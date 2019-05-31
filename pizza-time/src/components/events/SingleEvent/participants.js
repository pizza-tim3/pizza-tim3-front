import React from "react";
import { EventRow } from "../../../styles/eventStyles";
import user1 from "../../../assets/users/user-1.png";
import user2 from "../../../assets/users/user-2.png";
import user3 from "../../../assets/users/user-3.png";
import user4 from "../../../assets/users/user-4.png";
import plus from "../../../assets/plus.png";

class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const spans = document.getElementsByClassName("more-user");
    const span = spans[0];
    const addUserButton = document.getElementsByClassName("add-user");

    span.style.display = "none";
    span.className = "";

    if (addUserButton[0]) {
      addUserButton[0].onclick = function() {
        if (span.style.display === "none") {
          span.style.display = "flex";
          span.className = "more";
          if (span.style.display === "flex") {
            const close = document.getElementsByClassName("close-more");

            close[0].onclick = function() {
              span.style.display = "none";
              span.className = "";
            };
          }
        } else {
          span.style.display = "none";
          span.className = "";
        }
      };
    }
  }

  addUserHandler = e => {
    e.preventDefault();
    this.props.addUser();
  };
  render() {
    return (
      <>
        <EventRow>
          <h3>Invited</h3>
          <hr />
        </EventRow>
        <EventRow>
          {/* Shows list of invited users */}
          <div className="event-users">
            <img src={user1} alt="user1" />
            <img src={user2} alt="user2" />
            <img src={user3} alt="user3" />
            <img src={user4} alt="user4" />
            <img src={plus} alt="plus" className="add-user" />
          </div>
        </EventRow>
        <span className="more-user">
          {this.props.event.attending_users ? (
            <ul>
              {this.props.event.attending_users.map((user, index) => {
                return (
                  <li key={index} onClick={this.addUserHandler}>
                    <img src={user4} />
                    <h2>{user.name}</h2>
                  </li>
                );
              })}
              <button className="close-more">X</button>
            </ul>
          ) : (
            <div />
          )}
        </span>
      </>
    );
  }
}
export default Participants;
