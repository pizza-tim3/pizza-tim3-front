import React from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';
import Nav from '../../nav/nav';
import Footer from '../../footer/footer';

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