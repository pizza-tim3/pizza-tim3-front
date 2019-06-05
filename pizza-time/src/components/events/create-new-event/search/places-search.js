import React, {useState, useEffect} from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';

import {
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
} from '../../../../styles/placesSearchStyles.js';

const PlacesSearch = (props) => {
    const [placeId, setPlaceId] = useState('');
    const handleGetPlaceId = id => setPlaceId(id);

    return(
        <PlacesSearchWrap>
            <PlacesHeading>
                <h2>Step 1: Choose Your Location</h2>
            </PlacesHeading>
            <PlacesSearchInner>
                <SearchBar />
                <GoogleMap getId={handleGetPlaceId}/>
            </PlacesSearchInner>
            <NextStep onClick={() => props.handleClick()}>Next Step</NextStep>
        </PlacesSearchWrap>
    )
}

export default PlacesSearch