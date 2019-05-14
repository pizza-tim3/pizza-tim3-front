import React, { Component }  from 'react';
import './map.css';

class GoogleMap extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA4QgeLdTkXC_ulBAtLDmaY8nEaqZeRtsE&callback=initMap");
    //script is looking for window.initMap as a callback, which has been defined yet. 
    //so we need to set a reference to our initMap function in the window like so:
    window.initMap = this.initMap
  }

  
  //this is straight from the google maps api docs, it just initializes with a default location and zoom level (can be changed)
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.7604, lng: -95.3698},
      zoom: 8
    });

    let infoWindow = new window.google.maps.InfoWindow;

     //prompts user to allow their location, doing so lets us set their position in the 
    //google maps and makes queries easier 

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location Set!');
        infoWindow.open(map);
        map.setCenter(pos)
      },function() {
        window.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      window.handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  render(){
    return (
        <div id="map"></div>
    );
  };
};
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]; //---------grab the first script tag
  let script = window.document.createElement("script"); //------------------create new script tag
  script.src = url; //----------------
  script.async = true;//             |--------------------------------------creates the full url including 
  script.defer = true;//--------------                                      adding the async/defer at the end
  index.parentNode.insertBefore(script, index) //---------------------------inserts our script before the very first script
};
    

export default GoogleMap