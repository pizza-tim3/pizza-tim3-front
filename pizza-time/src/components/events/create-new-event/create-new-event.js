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
    const [readyToConfirm, setReadyToConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [placeId, setPlaceId] = useState('');


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)
        // setPageTwo(true);
        // setPageThree(true);
    }, [])

    const handleNextPage = () => setPage(page + 1);

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
                return <ConfirmationPage />
        }
    }
};

export default CreateNewEvent 