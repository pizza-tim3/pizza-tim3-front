import React, { useState, useEffect } from 'react';

//props from app placeId={event.place_id}

const Details = (props) => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  
  let url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA4QgeLdTkXC_ulBAtLDmaY8nEaqZeRtsE&libraries=places&callback=initMap';

  useEffect(() => {
    renderMap();
  }, [])

//   console.log(props)
  const renderMap = () => {
      setIsLoading(true);
      loadScript(url);
      window.initMap = initMap
  }

  const initMap = () => {
      try {
        let map = document.getElementById('map');

        let request = {
          placeId: props.placeId,
          fields: ['name', 'formatted_address', 'place_id', 'geometry']
        }

        const callBack = (place, status) => {
          if(status === window.google.maps.places.PlacesServiceStatus.OK) {
            
            // console.log(place);
            setData([...data, place]);
            setIsLoading(false);
          }
        }

        let service = new window.google.maps.places.PlacesService(map);

        service.getDetails(request, callBack);

    } catch (error) {
      console.log(error)
    }
  } 

if(loading) {
  return(
    <>
    <div>Loading....</div>
    <div id='map'></div>
    </>
  )
} else {
  return(
    <div>
      <h1>{data[0] && data[0].name}</h1>
      <div id='map'></div>
    </div>
  )
}
  
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