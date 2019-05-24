import React from "react";

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  render() {
    return (
      <div>
        <h1>Discussion</h1>
      </div>
    );
  }
}

export default Discussion;
