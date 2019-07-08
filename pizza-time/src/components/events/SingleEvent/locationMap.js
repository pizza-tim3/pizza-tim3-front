import React, { Component } from "react";

const AnyReactComponent = ({ text }) => <>{text}</>;
// const handleApiLoaded = (map, maps) => {
//   // use map and maps objects
// };
class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33,
      },
    };
  }
  componentDidMount() {
    // If props center has event's coordinates, set a new State
    if (this.props.center) {
      let currentStateCenter = this.props.center;
      this.setState({
        center: currentStateCenter,
      });
    }
    this.renderMap();
  }
  renderMap = () => {
    // Load api script w/ our credentials
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_PLACES_API_KEY
      }&callback=initMap`
    );
    // Initialize a map in the window
    window.initMap = this.initMap;
  };
  initMap = () => {
    // Append a new instance of google map to the #location-map div
    var map = new window.google.maps.Map(
      document.getElementById("location-map"),
      {
        zoom: 20,
        center: this.props.center,
      }
    );
    // The marker center position is set to the event's location's google api coordinates
    var marker = new window.google.maps.Marker({
      position: this.props.center,
      map: map,
    });
  };
  render() {
    return (
      <div className="current-map">
        {this.props.center ? <div id="location-map" /> : <></>}
      </div>
    );
  }
}
// Vanilla javascript to insert this script to the index.html, add defer and async properties
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.defer = true;
  script.async = true;
  index.parentNode.insertBefore(script, index);
}

export default LocationMap;
