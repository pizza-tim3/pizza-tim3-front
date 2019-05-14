import React from 'react';
import SearchBar from './search-bar';
import GoogleMap from './map';

const PlacesSearch = () => {
    return(
        <div>
            <h2>Search for new Pizza:</h2>
            <SearchBar />
            <GoogleMap />
        </div>
    )
}

export default PlacesSearch