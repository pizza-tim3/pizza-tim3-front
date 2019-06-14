import React, { useState, useEffect } from 'react';

//props from app placeId={event.place_id}

const Details = (props) => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;

  useEffect(() => {
    renderMap();
  })

  const sendToParent = (req) => {
    props.getDetails(req);
  }

//   console.log(props)
  const renderMap = () => {
      setIsLoading(true);
      loadScript(url);
      window.initMap = initMap
  }

  const initMap = () => {
      try {
        //select the element to place the search in
        let map = document.getElementById('map');
        //create a request object to pass to the service
        let request = {
          placeId: props.placeId,
          fields:['name', 'formatted_address', 'place_id', 'geometry', 'photos', 'formatted_phone_number', 'opening_hours']
        }
        //create a callback to pass into the service
        const callBack = async (place, status) => {
          const serviceStatus = window.google.maps.places.PlacesServiceStatus;
          setIsLoading(false);

          switch(status) {
            case serviceStatus.OK:
                sendToParent(place)
                break;
            case serviceStatus.ZERO_RESULTS:
                setError('No Results');
                break;
            case serviceStatus.INVALID_REQUEST:
                setError('Missing Place Id');
                break;
            default:
                setError('Server Issue');
          }
        }
        
        //initialize the service
        let service = new window.google.maps.places.PlacesService(map);

        // call the service method and pass it our request object and callback method
        // this returns an object containing any data in the fields method
        // possible field options can be found here: 
        // https://developers.google.com/places/web-service/place-data-fields
        service.getDetails(request, callBack);
        
    } catch (e) {
      setError('Error:', e);
    }
  } 

  if(loading) {
    return(
      <>
      <div>Loading....</div>
      <div id='map'></div>
      </>
    )
  }
  return <div id='map'></div> 
} 

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]; //---------grab the first script tag
  let script = window.document.createElement("script"); //------------------create new script tag
  script.src = url; //----------------
  script.async = true;//             |--------------------------------------creates the full url including 
  script.defer = true;//--------------                                      adding the async/defer at the end
  index.parentNode.insertBefore(script, index) //---------------------------inserts our script before the very first script
};

export default Details;