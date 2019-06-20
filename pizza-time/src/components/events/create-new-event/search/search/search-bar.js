import React from 'react';
import { SearchContainer } from '../../../../../styles/searchbarStyles';
import useForm from '../../../../../customHooks/customFormHooks';

const SearchBar = (props) => {

    const handleSendToParent = () => {
        let search = inputs.search
        props.handleGetSearchData(search)
    }

    const {inputs, handleInputChange, handleSubmit} = useForm(handleSendToParent);
    return(
        <SearchContainer>
            <input 
                type="search" 
                placeholder="City, State" 
                name="search" 
                id="bar"
                onChange={handleInputChange}
                value={inputs.search || ''}
            />
            <button onClick={() => {handleSubmit()}}>Search</button>
        </SearchContainer>
    )
}

export default SearchBar