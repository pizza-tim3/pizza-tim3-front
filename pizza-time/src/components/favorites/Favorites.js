import React from "react";
import { connect } from "react-redux";
import FavoritesList from "../favorites-list/FavoritesList";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      placesData: [],
      filterValue: "All",
      filterCities: [],
      url: `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_PLACES_API_KEY
      }&libraries=places&callback=initMap`
    };
  }

  //callback called after google maps api is initialized
  initMap = async () => {
    let map = new window.google.maps.Map(document.getElementById("map"));
    let service = new window.google.maps.places.PlacesService(map);

    //for each favorite make a call and set state with the data. HARD LIMIT 10
    this.state.favorites.forEach((favorite, index) => {
      const req = {
        placeId: favorite.google_place_id,
        fields: ["name", "photos", "formatted_address"]
      };
      //get info from places and put onto places state
      service.getDetails(req, async (place, status) => {
        const serviceStatus = window.google.maps.places.PlacesServiceStatus;
        if (serviceStatus.OK) {
          //get the first photo
          const url = place.photos[0].getUrl();
          //get the city from the address
          const city = place.formatted_address.split(",")[1].trim();

          //concat all cities and places onto respective state containers
          this.setState(prevState => {
            return {
              ...prevState,
              placesData: [
                ...prevState.placesData,
                {
                  photoUrl: url,
                  name: place.name,
                  address: place.formatted_address,
                  city: city
                }
              ],
              filterCities: [...prevState.filterCities, city]
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
      loadScript(this.state.url);
    } catch (error) {}
  }

  componentWillUnmount() {
    //cleans up the  google API to stop causing an error
    window.google = null;
  }

  //handles filter change
  handleChange = event => {
    this.setState({ filterValue: event.target.value });
  };

  render() {
    const { favorites, placesData, filterValue, filterCities } = this.state;
    const dataLoaded = placesData && placesData.length === favorites.length;

    return (
      <div>
        <div>
          <select onChange={this.handleChange}>
            <option value="All">All</option>
            {/* Using a set because multiple favorites can be in one city. Sets can't have dupes */}
            {dataLoaded
              ? [...new Set(filterCities)].map(city => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))
              : null}
          </select>
        </div>
        {dataLoaded ? (
          <FavoritesList places={placesData} filter={filterValue} />
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
