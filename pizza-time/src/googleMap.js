import React from "react";
import { connect } from "react-redux";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      map: null,
      service: null,
      placesData: [],
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

    //for each favorite get the details, limited to 10 :()
    const len = this.state.favorites.length;

    //for each favorite make a call and set state with the data. HARD LIMIT 10
    this.state.favorites.forEach((favorite, index) => {
      const req = {
        placeId: favorite.google_place_id,
        fields: ["name", "photos"]
      };
      service.getDetails(req, async (place, status) => {
        const serviceStatus = window.google.maps.places.PlacesServiceStatus;
        if (serviceStatus.OK) {
          this.setState(prevState => {
            return {
              ...prevState,
              placesData: [...prevState.placesData, place]
            };
          });
        }
      });
    });
  };

  //on mount get the favorites from the backend
  async componentDidMount() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_URL}/api/favorites/${
          this.props.firebase_uid
        }`
      );
      const json = await response.json();
      //set the state with the favorites
      this.setState(prevState => ({ ...prevState, favorites: json }));

      //initailize the map by placing it on window for the callback
      window.initMap = this.initMap;
      this.loadMap();
    } catch (error) {}
  }

  render() {
    const { favorites, placesData } = this.state;
    return (
      <div>
        <h3> Favorites Works! </h3>
        {favorites.map(fav => (
          <div>
            <p>{fav.name}</p>
          </div>
        ))}
        {placesData && placesData.length === favorites.length ? (
          placesData.map(place => {
            const url = place.photos[0].getUrl();
            return (
              <div>
                <p>{place.name}</p>
                <img src={url} height="200px" width="200px" />
              </div>
            );
          })
        ) : (
          <p>LOADING</p>
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

const mstp = ({ userReducer }) => userReducer;

export default connect(
  mstp,
  {}
)(Favorites);