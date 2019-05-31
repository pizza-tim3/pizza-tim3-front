import React, {useState, useEffect} from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';

const PlacesSearch = (props) => {
    const [placeId, setPlaceId] = useState('');
    const handleGetPlaceId = (id) => setPlaceId(id);

    return(
        <div className="places-search-wrapper">
            <h1>Pick a place near you or search somewhere else!</h1>
            <SearchBar />
            <GoogleMap getId={handleGetPlaceId}/>
            <button onClick={() => {props.handleClick()}}>Next Step</button>
        </div>
    )
}

export default PlacesSearch