import React from 'react';
import SearchBar from './search-bar';
import GoogleMap from './map';

import Nav from '../../home-header/home-header.js';
import Footer from '../../footer/footer.js';

const PlacesSearch = () => {
    return(
        <div>
            <Nav />
            <h2>Search for new Pizza:</h2>
            <SearchBar />
            <GoogleMap />
            <Footer />
        </div>
    )
}

export default PlacesSearch