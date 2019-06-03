import React, {useState} from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';

// props from create-new-event
// handleClick={handleNextPage} 
// handleUpdateState={handleUpdateState}

const PlacesSearch = (props) => {

    const [placeId, setPlaceId] = useState('');

    const handleGetPlaceId = (id) => {
        setPlaceId(id);
    }

    console.log(placeId)
    return(
        <div className="places-search-wrapper">
            <h1>Pick a place near you or search somewhere else!</h1>
            <SearchBar />
            <GoogleMap getId={handleGetPlaceId}/>
            <button onClick={() => {props.handleClick('placeID', placeId)}}>Next Step</button>
        </div>
    )
}

export default PlacesSearch