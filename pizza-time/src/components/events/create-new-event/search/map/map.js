import React, { Component } from 'react';
import PlacesList from '../list/places-list';
// import axios from 'axios';

class GoogleMap extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lat: '',
        lng: '',
        placesData: [],
        searchString: this.props && this.props.searchData,
        req: {},
        url: `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_PLACES_API_KEY
      }&libraries=places&callback=initMap`
      }; 
    }
    loadMap = () => {
      loadScript(this.state.url);
    };

    initMap = async () => {
      let map = new window.google.maps.Map(document.getElementById("map"));
      let service = new window.google.maps.places.PlacesService(map);

      // let searchLocation = new window.google.maps.LatLng(this.state.lat, this.state.lng)
      let request = {
        query: `Pizza ${this.state.searchString}`
      }

      const callback = (results, status) => {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
              placesData: results
            })
        }
      }

      service.textSearch(request, callback);

      
    };

    componentDidMount() {
        window.initMap = this.initMap;
        this.loadMap();  
    }

    handleOnClick = (id, placeName) => {
      this.setState({ searchString: this.props.searchData });
      this.props.getPlaceData(id, placeName);
    }

    render() {
      return(
        <div>
          <PlacesList data={this.state.placesData} handleClick={this.handleOnClick}/>
          <div id="map"></div>
        </div>
      )
    }
}

//creates a script tag to import the google api
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]; //---------grab the first script tag
  let script = window.document.createElement("script"); //------------------create new script tag
  script.src = url; //----------------
  script.async = true;//             |--------------------------------------creates the full url including 
  script.defer = true;//--------------                                      adding the async/defer at the end
  index.parentNode.insertBefore(script, index) //---------------------------inserts our script before the very first script
};

export default GoogleMap
