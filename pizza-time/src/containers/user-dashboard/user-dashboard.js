import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";

import Nav from "../../components/home-header/home-header.js";
import Card from "../../components/card/card.js";
import { Wrap, Inner } from "../../styles/userhomeStyles.js";

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingEvents: [],
      upcomingEvents: [],
      pastEvents: [],
      selectedTab: "PendingEvents",
      url: `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_PLACES_API_KEY
      }&libraries=places&callback=initMap`,
      mapLoaded: false,
      userEvents: []
    };
  }

  componentDidMount() {
    this.pendingHandler();
    this.getAllEventsUserMade();
  }

  loadMap = () => {
    loadScript(this.state.url);
  };

  initMap = async () => {
    let map = new window.google.maps.Map(document.getElementById("map")); //search for the div id having map
    let service = new window.google.maps.places.PlacesService(map);

    //for each favorite make a call and set state with the data. HARD LIMIT 10
    let events = this.state.upcomingEvents;
    if (this.state.selectedTab == "PendingEvents") {
      events = this.state.pendingEvents;
    } else if (this.state.selectedTab == "PastEvents") {
      events = this.state.pastEvents;
    }

    events.forEach((event, index) => {
      const req = {
        placeId: event.google_place_id,
        fields: ["name", "photos"],
      };
      service.getDetails(req, async (place, status) => {
        const serviceStatus = window.google.maps.places.PlacesServiceStatus;
        if (serviceStatus.OK) {
          if (place) {
            event.location = place.name;
          } else {
            event.location = "Can not read";
          }
          this.setState({ mapLoaded: true });
        }
      });
    });
  };


  getAllEventsUserMade = () => {
    const id = localStorage.getItem('firebase_uid');
    axios.get('https://pizza-tim3-be.herokuapp.com/api/events')
      .then(res => {
        const date = new Date().getTime() / 1000;
        let upcoming = res.data.filter(item => {
          return item.organizer === id
        })
        upcoming = upcoming.filter(item => {
          return item.event_date > date
        })
        upcoming = upcoming.map(i => {
          return {
            event_date: i.event_date,
            event_id: i.id,
            event_name: i.event_name,
            google_place_id: i.place,
            pending: false,
            user_id: i.organizer
          }
        })

        this.setState({
          ...this.state,
          userEvents: upcoming
        });
      }).catch(e => console.log(e))
  }


  upcomingHandler = event => {
    event.preventDefault();
    const id = localStorage.getItem("firebase_uid");
    axios
      .get(`https://pizza-tim3-be.herokuapp.com/api/events/upcoming/${id}`)
      .then(res => {

        this.setState({
          upcomingEvents: res.data.result.concat(this.state.userEvents),
          selectedTab: "UpcomingEvents",
          mapLoaded: false,
        });
        window.initMap = this.initMap;
        this.loadMap();
      })
      .catch(error => {
        this.setState({ error });
      });
  };


  pendingHandler = event => {
    const id = localStorage.getItem("firebase_uid");
    axios
      .get(`https://pizza-tim3-be.herokuapp.com/api/events/pending/${id}`)
      .then(res => {
        this.setState({
          pendingEvents: res.data.result,
          selectedTab: "PendingEvents",
          mapLoaded: false,
        });
        window.initMap = this.initMap;
        this.loadMap();
      })
      .catch(error => {
        this.setState({ error });
      });
  };


  pastHandler = event => {
    const id = localStorage.getItem("firebase_uid");
    event.preventDefault();
    axios
      .get(`https://pizza-tim3-be.herokuapp.com/api/events/past/${id}`)
      .then(res => {
        this.setState({
          pastEvents: res.data.result,
          selectedTab: "PastEvents",
          mapLoaded: false,
        });
        window.initMap = this.initMap;
        this.loadMap();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <>
        <Nav />
        <Wrap>
          <Inner>
            <Tabs defaultIndex={1}>
              <TabList className="tabBox">
                <Tab
                  className="filterBtn"
                  onClick={this.upcomingHandler}
                  selectedClassName="filterBtnActive"
                >
                  Upcoming
                </Tab>
                <Tab
                  className="filterBtn"
                  onClick={this.pendingHandler}
                  selectedClassName="filterBtnActive"
                >
                  Pending
                </Tab>
                <Tab
                  className="filterBtn"
                  onClick={this.pastHandler}
                  selectedClassName="filterBtnActive"
                >
                  Past
                </Tab>
              </TabList>
              <TabPanel className="tab">
                {this.state.upcomingEvents.map(event => {
                  return <Card key={event.id} event={event} />;
                })}
              </TabPanel>
              <TabPanel>
                {this.state.pendingEvents.length >= 1 ?
                  this.state.pendingEvents.map(event => {
                    return (
                      <Card key={event.event_id} event={event} showActions={true} />
                    );
                  }) :
                  <div>
                    <h2>Nothing to show...</h2>
                  </div>
                }

              </TabPanel>
              <TabPanel>
                {this.state.pastEvents.map(event => {
                  return <Card key={event.id} event={event} />;
                })}
              </TabPanel>
            </Tabs>
          </Inner>
        </Wrap>
        <div id="map" />
      </>
    );
  }
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]; //---------grab the first script tag
  let script = window.document.createElement("script"); //------------------create new script tag
  script.src = url; //----------------
  script.async = true; //             |--------------------------------------creates the full url including
  script.defer = true; //--------------                                      adding the async/defer at the end
  index.parentNode.insertBefore(script, index); //---------------------------inserts our script before the very first script
}

export default UserDashboard;
