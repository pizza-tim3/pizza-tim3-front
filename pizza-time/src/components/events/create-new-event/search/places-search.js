import React, {useState, useEffect} from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';

import {
    Wrap,
    Inner,
} from '../../../../styles/placesSearchStyles';

const PlacesSearch = (props) => {
    const [placeId, setPlaceId] = useState('');
    const handleGetPlaceId = (id) => setPlaceId(id);

    return(
        <Wrap>
            <Inner>
                <SearchBar />
                <GoogleMap getId={handleGetPlaceId}/>
                <button className="next" onClick={() => {props.handleClick()}}>Next Step</button>
            </Inner>
        </Wrap>
    )
}

export default PlacesSearch