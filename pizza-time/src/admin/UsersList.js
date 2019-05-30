import React from "react";
import axios from "axios";

// Component showing all users in the database

class UsersList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    // Assign the response from the server's fetchAll users backend to state's users prop
    axios
      .get("https://pizza-tim3-be.herokuapp.com/api/users")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ users: [] });
      });
  }

  render() {
    // Display a list of users in JSX
    return (
      <div className="container">
        <ul>
          {this.state.users.map((user, index) => {
            return (
              <div key={index}>
                <h2>
                  {user.first_name} {user.last_name}
                </h2>
                <h3>{user.email}</h3>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UsersList;
