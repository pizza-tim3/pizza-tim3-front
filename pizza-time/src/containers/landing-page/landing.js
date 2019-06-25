import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import HomeHeader from "./../../components//home-header/home-header.js";

import { Wrap, Inner, Buttons } from "../../styles/landingStyles.js";
import CarouselTest from '../../assets/carouseltest.jpg';

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
    let imgs = [CarouselTest];

     this.setState({
       carousel: imgs
     })
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
          <>
            <h1>Pizza Time</h1>
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
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <Buttons>
              <button className="loginBtn">Login</button>
              <button className="registerBtn">Register</button>
            </Buttons>
          </>
        </Inner>
      </Wrap>
    );
  }
}

export default Landing;
