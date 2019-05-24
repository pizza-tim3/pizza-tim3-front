import React from 'react';
import './search-bar.css';

const SearchBar = () => {
    return(
        <div className="searchBar"  >
            <h2>Search:</h2>
            <input type="search" placeholder="City, State" name="search" id="bar"/>
        </div>
    )
}

export default SearchBar