import React from "react";
// import Details from "../.././components/events/details-request/details-request.js";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      url: `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_PLACES_API_KEY
      }&libraries=places&callback=initMap`,
    };
  }

  loadMap = () => {
    loadScript(this.state.url);
  };

  initMap = async () => {
    let map = new window.google.maps.Map(document.getElementById("map"));
    let service = new window.google.maps.places.PlacesService(map);

    //for each favorite get the details, limited to 10 :()

    //for each favorite make a call and set state with the data. HARD LIMIT 10

    const req = {
      placeId: this.props.google_place_id,
      fields: ["name", "photos"],
    };
    service.getDetails(req, async (place, status) => {
      const serviceStatus = window.google.maps.places.PlacesServiceStatus;
      if (serviceStatus.OK) {
        this.setState({
          location: place.name,
        });
      }
    });
  };

  async componentDidMount() {
    window.initMap = this.initMap;
    this.loadMap();
  }

  getLocation = req => {
    this.setState({ location: req.name });
  };

  render() {
    // if (this.state.location.length != 0) {
    //   return <div>{this.state.location}</div>;
    // } else {
    //   return (
    //     <Details
    //       getDetails={this.getLocation}
    //       placeId={this.props.google_place_id}
    //     />
    //   );
    // }
    return (
      <div>
        {this.state.location.length === 0 ? (
          <p> Loading ..</p>
        ) : (
          <p> {this.state.location} </p>
        )}
        <div id="map" />
      </div>
    );
  }
}

//needed to load the order of scripts so that react can see the google maps script
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]; //---------grab the first script tag
  let script = window.document.createElement("script"); //------------------create new script tag
  script.src = url; //----------------
  script.async = true; //             |--------------------------------------creates the full url including
  script.defer = true; //--------------                                      adding the async/defer at the end
  index.parentNode.insertBefore(script, index); //---------------------------inserts our script before the very first script
}

export default Location;
