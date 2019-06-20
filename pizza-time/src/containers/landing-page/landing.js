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
    // Here you can set the array of the images you wish to slide to the state
    //  this.setState({
    //    carousel: ImagesArray
    //  })
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
                    {this.state.carousel.map((image, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <img src={image} alt="carousel" />
                          <Carousel.Caption>
                            <Link to={``}>Send him to wherever</Link>
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
