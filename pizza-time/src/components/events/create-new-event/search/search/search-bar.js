import React from 'react';
import { SearchContainer } from '../../../../../styles/searchbarStyles';

const SearchBar = () => {
    return(
        <SearchContainer>
            <input 
                type="search" 
                placeholder="City, State" 
                name="search" 
                id="bar" />
        </SearchContainer>
    )
}

export default SearchBar