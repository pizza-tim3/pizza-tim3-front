import React from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';

const PlacesSearch = (props) => {
    return(
        <div className="places-search-wrapper">
            {/* <Nav /> */}
                <h1>Pick a place near you or search somewhere else!</h1>
                <SearchBar />
                <GoogleMap />
                <button onClick={() => {props.handleClick()}}>Next Step</button>
                
            {/* <Footer /> */}
        </div>
    )
}

export default PlacesSearch