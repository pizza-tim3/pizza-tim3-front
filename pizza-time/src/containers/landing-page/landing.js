import React from 'react';

import { Link } from 'react-router-dom';

import {
    Wrap,
    Inner,
    Heading,
    Buttons,
} from '../../styles/landingStyles.js';

const Landing = () => {
    return(
        <Wrap>
            <Inner>
                <Heading>
                    <h1>Pizza Time</h1>
                    <p>Lorem ipsum text here<br /> lorem ipsum text</p>
                </Heading>
                <Buttons>
                    <Link to="/login" className="loginBtn">Sign In</Link>
                    <Link to="/register" className="registerBtn">Sign Up</Link>
                </Buttons>
            </Inner>
        </Wrap>
    );
}

export default Landing 