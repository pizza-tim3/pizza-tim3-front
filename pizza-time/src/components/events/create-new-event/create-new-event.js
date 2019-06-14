import React, {useState, useEffect} from 'react';
import Loading from '../../loading/loading';
import DatePicker from './date/date-picker';
import FriendPicker from './friendPicker/friendPicker';
import ConfirmationPage from './confirmation/confirmation';
import PlacesSearch from './search/places-search';
import NameAndDetails from './name-details/name-details';
import { CreateNewEventWrap } from '../../../styles/createNewEventStyles';

const CreateNewEvent = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [placeId, setPlaceId] = useState('');
    const [eventDetails, setEventDetails] = useState({});
    const [dateTime, setDateTime] = useState({});
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)
    }, [])

    const handleNextPage = (stateToChange, newValue) => {
        setPage(page + 1);
        console.log(stateToChange, newValue);

        switch(stateToChange) {
            case 'placeID':
                setPlaceId(newValue);
                break;
            case 'event':
                setEventDetails(newValue);
                break;
            case 'dateTime': 
                setDateTime(newValue);
                break;
            case 'addFriends':
                setFriends(newValue);
                break;
        }
    }

    if(isLoading) {
        return(
            <Loading />
    )} else {
        switch(page) {
            case 1:
                return <PlacesSearch handleClick={handleNextPage}/>
            case 2:
                return <NameAndDetails handleClick={handleNextPage}/>
            case 3: 
                return <DatePicker handleClick={handleNextPage}/>
            case 4:
                return <FriendPicker handleClick={handleNextPage}/>
            case 5:
                return(
                    <div className='events-wrapper'>
                        <ConfirmationPage 
                            place={placeId} 
                            event={eventDetails} 
                            dateTime={dateTime}
                            friends={friends}
                        />
                    </div>
                );
        }
    }
};

export default CreateNewEvent 