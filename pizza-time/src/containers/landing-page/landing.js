import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import { Wrap, Inner, Buttons } from "../../styles/landingStyles.js";
import SlideOne from '../../assets/slide_one.png';
import SlideTwo from '../../assets/slide_two.png';
import SlideThree from '../../assets/slide_three.png';
import SlideFour from '../../assets/slide_four.png';
import SlideFive from '../../assets/slide_five.png';
import SlideSix from '../../assets/slide_six.png';

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
    let imgs = [
      SlideOne,
      SlideTwo,
      SlideThree,
      SlideFour,
      SlideFive,
      SlideSix
    ];

    this.setState({ carousel: imgs })
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
              <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
                interval="2500"
              >
                {this.state.carousel.map((image, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img src={image} alt="carousel" />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
            <Buttons>
              <Link className="loginBtn" to="/login">Login</Link>
              <Link className="registerBtn" to="/register">Sign Up</Link>
            </Buttons>
          </>
        </Inner>
      </Wrap>
    );
  }
}

export default Landing;
