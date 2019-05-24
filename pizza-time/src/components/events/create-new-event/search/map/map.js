import React, { useState, useEffect } from 'react';
import './map.css';
import PlacesList from '../list/places-list';
import axios from 'axios';

const GoogleMap = () => {
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [placesData, setData] = useState([])
    let service;
    let url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA4QgeLdTkXC_ulBAtLDmaY8nEaqZeRtsE&libraries=places&callback=initMap"
    let data = [];
    //used in place of componentDidMount to render the map
    useEffect(() => {
      renderMap()
    }, []);

    //renderMap will call the loadScript function and pass in the URL, this creates the DOM script element that is needed in order to 
    //pull in the google api services
    const renderMap = () => {
      loadScript(url);
      window.initMap = initMap
    }

    //when called it will create a new instance of the google.maps.Map and place it in the div we create below.
    //the google.maps.Map takes in 2 parameters, a DOM element in which to be placed and an object containing the coords
    //for the center of the map and the zoom level you want defaulted
    const initMap = () => {
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng},
        zoom: 12
      });

      //creates a new instance of infoWindow, this is the window that pops up over the location
      let infoWindow = new window.google.maps.InfoWindow();

      //prompts user for permission to use location services
      //the browser supplies navigator.geolocation, so first we need to verify that navigator.geolocation
      //is even an option,  
      
      if(navigator.geolocation){
        //if so we can get the current location of the user by calling the getCurrentPosition method
        navigator.geolocation.getCurrentPosition((position) => {
          //it will return an object, we need to pull our values from that object and store them in our own more managable object
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          //set our state to the lat and lng from our pos object
          setLat(pos.lat)
          setLng(pos.lng)

          //creates a new google.maps.LatLng object and passes in the pos object (we use this to setCenter of map)
          let latLng = new window.google.maps.LatLng(pos);
          
          //set the infoWindows position
          infoWindow.setPosition(pos);
          //set the content inside of the infoWindow
          infoWindow.setContent('Location Set!');
          //open the infoWindow on our map
          infoWindow.open(map);
          //setCenter requires a LatLng object from google.maps
          map.setCenter(latLng);

        },function() {
          //browser provided function
          window.handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        window.handleLocationError(false, infoWindow, map.getCenter());
      }

      //set our searchLocation to our location that is in state
      let searchLocation = new window.google.maps.LatLng(lat, lng)
      //craft our request; see google docs to see what parameters can be passed into a request to refine your results
      let request = {
        location: searchLocation,
        radius: '100',
        query: 'Pizza',
        type: 'restaurant'
      };

      //creates a new PlacesService which allows up to place requests to the api library;
      //only takes one parameter... the DOM element in which it will reside
      service = new window.google.maps.places.PlacesService(map);

      //initiates the textSearch... requires 2 parameters, the request object and a callback function.
      //the call back function is where you modify your data
      service.textSearch(request, (results, status)=> {
        if(status === window.google.maps.places.PlacesServiceStatus.OK) {
          for(let i = 0; i < results.length; i++){
              data.push(results[i]);
              //##TODO CREATE MARKER FUNCTION AND HAVE ONE DISPLAYED FOR EACH SEARCH RESULT
          }
        } else {
          console.log('there was an error')
          //##TODO write error to search list 
        }

        //then we set the state to our data array
        setData(data);
      });
    }
    
    // adds placeId to database
    const handleOnClick = (placeId) => {
      let placeid = {google_place_id : placeId};
      axios.post('http://localhost:5500/api/placesId/', placeid)
        .then(res => console.log('returned from post:', res))
        .catch(e => console.log(e))
    }

      return (
        <div className="map-search">
          <PlacesList data={placesData} handleClick={handleOnClick}/>
          <div id="map">
          </div>
        </div>
      );
};

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
