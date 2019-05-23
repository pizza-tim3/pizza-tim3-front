import React from "react";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    // console.log(this.props.event.attending_users);
    return (
      <div>
        {this.props.event.location ? (
          <div>
            <h2>{this.props.event.event_date}</h2>
            <h2>{this.props.event.location.name}</h2>
            <ul>
              {this.props.event.attending_users.map((user, index) => {
                return <li key={index}>{user.name}</li>;
              })}
            </ul>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Info;
