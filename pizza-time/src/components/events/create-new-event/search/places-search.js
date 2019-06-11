import React, {useState} from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';
import {
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
} from '../../../../styles/placesSearchStyles.js';

// props from create-new-event
// handleClick={handleNextPage} 
// handleUpdateState={handleUpdateState}

const PlacesSearch = (props) => {
    const [placeId, setPlaceId] = useState('');
    const [searchData, setSearch] = useState('')
    const handleGetPlaceId = id => setPlaceId(id);
    const handleGetSearchData = (searchString) => {
        setSearch(searchString)
    }
    return(
        <PlacesSearchWrap>
            <PlacesHeading>
                <h2>Step 1: Choose Your Location</h2>
            </PlacesHeading>
            <PlacesSearchInner>
                <SearchBar handleGetSearchData={handleGetSearchData}/>
                <GoogleMap getId={handleGetPlaceId} searchData={searchData}/>
            </PlacesSearchInner>
            <NextStep 
                onClick={() => {props.handleClick('placeID', placeId)}}>
                Next Step
            </NextStep>
        </PlacesSearchWrap>
    )};

export default PlacesSearch