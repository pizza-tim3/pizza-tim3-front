import React from 'react';

import Nav from '../home-header/home-header.js';
import Footer from '../footer/footer.js';
import PlacesSearch from './search/places-search.js';

const Events = () => {
    return(
        <div>
            <Nav />
            <h2> Events Works! </h2>
            <PlacesSearch />
            <Footer />
        </div>
    );
};

export default Events 