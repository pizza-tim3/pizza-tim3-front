import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { Wrap, Inner, Heading, Buttons } from "../../styles/landingStyles.js";
import HomeHeader from "./../../components//home-header/home-header.js";
// import pizza from "./../../assets/pizza.png";
class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      carousel: [],
    };
  }

  componentDidMount() {
    let latestEvents = [];
    let currentUser = localStorage.getItem("userFireBaseId");
    console.log(currentUser);
    // if (currentUser) {
    //   axios
    //     .get(
    //       `https://pizza-tim3-be.herokuapp.com/api/events/upcoming/${currentUser}`
    //     )
    //     .then(response => {
    //       console.log(response);
    //       for (let i = 0; i < response.data.length; i++) {
    //         latestEvents.push(response.data[i]);
    //       }
    //       // let usersEvents = latestEvents.filter(event => event.organizer === this.state.user.id)
    //       this.setState({
    //         carousel: latestEvents,
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // } else {
    axios
      .get(`https://pizza-tim3-be.herokuapp.com/api/events`)
      .then(response => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          latestEvents.push(response.data[i]);
        }
        // let usersEvents = latestEvents.filter(event => event.organizer === this.state.user.id)
        this.setState({
          carousel: latestEvents,
        });
      })
      .catch(err => {
        console.log(err);
      });
    // }
  }
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }
  render() {
    const { index, direction } = this.state;
    return (
      <Wrap>
        <Inner>
          <Heading>
            <HomeHeader className="landing-header" />
          </Heading>
          <>
            <div className="small-carousel">
              {this.state.carousel.length > 0 ? (
                <>
                  <Carousel
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.handleSelect}
                  >
                    {this.state.carousel.map(event => {
                      let readableDate = new Date(Number(event.event_date));
                      return (
                        <Carousel.Item key={event.id}>
                          <img
                            // className="d-block w-100"
                            src="https://cdn.pixabay.com/photo/2015/09/14/11/43/restaurant-939435_960_720.jpg"
                            alt="First slide"
                          />
                          <Carousel.Caption>
                            <Link to={`/event/${event.id}`}>
                              <h2>Why: {event.event_name}</h2>
                              <h3>Where: {event.event_description}</h3>
                              <h4>When: {readableDate.toDateString()}</h4>
                            </Link>
                          </Carousel.Caption>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </>
        </Inner>
      </Wrap>
    );
  }
}

export default Landing;
