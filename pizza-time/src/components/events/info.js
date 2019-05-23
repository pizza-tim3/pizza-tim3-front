import React from "react";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <h2>
          {" "}
          Event Name <span />{" "}
        </h2>
      </div>
    );
  }
}

export default Info;
