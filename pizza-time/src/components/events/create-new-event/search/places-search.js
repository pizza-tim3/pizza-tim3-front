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
    const [placeData, setPlaceData] = useState('');
    const [searchData, setSearch] = useState('')
    const [show, setShow] = useState(false);

    const handleGetPlaceData = (id, place) => {
        const data = {
            placeId: id,
            placeName: place
        }
        setPlaceData(data);
        
    };

    console.log(placeData)

    const handleGetSearchData = (searchString) => {
        setSearch(searchString)
        setShow(!show)
    }
    console.log(searchData)
    return(
        <PlacesSearchWrap>
            <PlacesHeading>
                <h2>Step 1: Choose Your Location</h2>
            </PlacesHeading>
            <PlacesSearchInner>
                <SearchBar handleGetSearchData={handleGetSearchData}/>
                { show ? <GoogleMap getPlaceData={handleGetPlaceData} searchData={searchData}/> : null }
            </PlacesSearchInner>
            <NextStep 
                onClick={() => {props.handleClick('placeData', placeData)}}>
                Next Step
            </NextStep>
        </PlacesSearchWrap>
    )};

export default PlacesSearch