import React, {Component} from 'react';
import SearchBar from './search/search-bar';
import GoogleMap from './map/map';
import {
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
    XButton
} from '../../../../styles/placesSearchStyles.js';
import { connect } from 'react-redux';
import { setLoading } from '../../../../actions/eventActions';
import close from '../../../../assets/close.png';
import { Link } from 'react-router-dom';
// props from create-new-event
// handleClick={handleNextPage} 
// handleUpdateState={handleUpdateState}

class PlacesSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesData: {},
            searchData: '',
            show: false
        }
    }

    componentDidMount() {
        setLoading(false)
    }

    handleGetPlaceData = (id, place) => {
        const data = {
            placeId: id,
            placeName: place
        }
        this.setState({ placesData: data })
    };

    handleGetSearchData = (searchString) => {
        this.setState({
            ...this.state,
            searchData: searchString,
            show: true
        });
    }

    render() {
            return(
                <PlacesSearchWrap>
                    <XButton>
                        <Link to="/home">
                            <img src={close} alt='close' />
                        </Link>
                    </XButton>
                    <PlacesSearchInner>
                        <PlacesHeading>
                            <h2>Choose Your Location:</h2>
                        </PlacesHeading>

                        
                        <SearchBar handleGetSearchData={this.handleGetSearchData}/>

                        {this.state.show ? 
                            <GoogleMap 
                                getPlaceData={this.handleGetPlaceData} 
                                searchData={this.state.searchData}/> : 
                            <div />
                        }
                        <NextStep onClick={() => {this.props.handleClick('placeData', this.state.placeData)}}>
                            Next Step
                        </NextStep>
                    </PlacesSearchInner>
                </PlacesSearchWrap>
            )
    }
}

const mstp = state => {
    return {
        loading: state.loading,
        placeId: state.placeId,
        placeName: state.placeName
    }
}

export default connect(mstp, {setLoading})(PlacesSearch)