import React, { Component } from "react";
import { Span } from "../../../../../styles/placesListStyles";
import { PlacesCard } from "../../../../../styles/placesSearchStyles";

export default class Place extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleToggle = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  handleClick = e => {
    console.log("clicked");
    this.handleToggle();
    this.props.handleClick(this.props.data.place_id, this.props.data.name);
  };

  render() {
    return (
      <PlacesCard onClick={() => this.handleClick()} active={this.state.active}>
        <div>
          <p>{this.props.data.name}</p>
          <p className="rating">
            Rating:{" "}
            <Span rating={this.props.data.rating}>
              {this.props.data.rating}
            </Span>
          </p>
          <p>
            Location: <span>{this.props.data.formatted_address}</span>
          </p>
        </div>
      </PlacesCard>
    );
  }
}
