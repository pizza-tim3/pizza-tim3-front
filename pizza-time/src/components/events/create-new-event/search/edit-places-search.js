import React, { useState } from "react";
import SearchBar from "./search/search-bar";
import GoogleMap from "./map/map";
import searchmap from "./../../../../assets/searchmap.png";
import { Inner } from "../../../../styles/editLocationStyles.js";

const UpdatePlacesSearch = props => {
  const [placeData, setPlaceData] = useState("");
  const [searchData, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const handleGetPlaceData = (id, place) => {
    const data = {
      placeId: id,
      placeName: place,
    };
    
    props.chooseLocation(id, place);
    setPlaceData(data);
  };

  const handleGetSearchData = searchString => {
    setSearch(searchString);
    setShow(!show);
  };
  
  return (
    <Inner>
      <div>
        <h2>Find a new location</h2>
      </div>
      <div className="new-location-search">
        <SearchBar handleGetSearchData={handleGetSearchData} />
        {show ? (
          <GoogleMap
            getPlaceData={handleGetPlaceData}
            searchData={searchData}
          />
        ) : null}
      </div>
    </Inner>
  );
};

export default UpdatePlacesSearch;
