import React, {Component} from 'react';
import { SearchContainer } from '../../../../../styles/searchbarStyles';
import next from '../../../../../assets/nextArrow.png';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleSubmit = () => {
        console.log(this.state.search)
        this.props.handleGetSearchData(this.state.search)
    }

    render() {
        return(
            <SearchContainer>
                <input 
                    type="search" 
                    placeholder="City, State" 
                    name="search" 
                    id="bar"
                    onChange={this.handleChange}
                    value={this.state.search}
                />
                <button 
                    onClick={() => {this.handleSubmit()}}>
                        <img src={next} alt="next arrow" />
                </button>
            </SearchContainer>
        )
    }
}

export default SearchBar
