import React, {Component} from 'react';
import Loading from '../../loading/loading';
import DatePicker from './date/date-picker';
import FriendPicker from './friendPicker/friendPicker';
import ConfirmationPage from './confirmation/confirmation';
import PlacesSearch from './search/places-search';
import NameAndDetails from './name-details/name-details';
import { CreateNewEventWrap } from '../../../styles/createNewEventStyles';
import { connect } from 'react-redux';
import { setLoading } from './../../../actions/eventActions';


class CreateNewEvent extends Component {
    constructor() {
        super();
        this.state = {
            page: 1
        }
    }

    componentDidMount() {
        setLoading(false)
    }

    handleNextPage = () => {
        this.setState({ page: this.state.page + 1 });
        setLoading(true)
        console.log(this.state.page);
    }

    render() {
        if(this.props.loading) {
            return <Loading />
        } else {
            switch(this.state.page) {
                case 1:
                    return <PlacesSearch handleClick={this.handleNextPage}/>
                case 2:
                    return <NameAndDetails handleClick={this.handleNextPage}/>
                case 3: 
                    return <DatePicker handleClick={this.handleNextPage}/>
                case 4:
                    return <FriendPicker handleClick={this.handleNextPage}/>
                case 5:
                    return(
                        <div className='events-wrapper'>
                            <ConfirmationPage />
                        </div>
                    );
            }
        }
    }
}

const mstp = state => {
    return {
        loading: state.EventReducer.loading
    }
}

export default connect (mstp, { setLoading })(CreateNewEvent)