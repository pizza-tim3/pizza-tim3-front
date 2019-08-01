import React, {Component} from 'react';
import { SearchContainer } from '../../../../../styles/searchbarStyles';
import next from '../../../../../assets/searchOrange.png';

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
                <div onClick={() => {this.handleSubmit()}} className="search">
                    <img src={next} alt="search" />
                </div>
            </SearchContainer>
        )
    }
}

export default SearchBar
