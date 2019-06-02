import React, {useState, useEffect} from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';

import {
    PlacesSearchWrap,
    PlacesSearchInner,
} from '../../../../styles/placesSearchStyles.js';

const PlacesSearch = (props) => {
    const [placeId, setPlaceId] = useState('');
    const handleGetPlaceId = id => setPlaceId(id);

    return(
        <PlacesSearchWrap>
            <PlacesSearchInner>
                <SearchBar />
                <GoogleMap getId={handleGetPlaceId}/>
                <button 
                    className="next"
                    onClick={() => props.handleClick()}>Next Step</button>
            </PlacesSearchInner>
        </PlacesSearchWrap>
    )
}

export default PlacesSearch