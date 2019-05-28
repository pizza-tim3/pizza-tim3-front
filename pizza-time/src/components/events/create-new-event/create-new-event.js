import React, {useState, useEffect} from 'react';
import './events.css';
import DatePicker from './date/date-picker';
import FriendPicker from './friendPicker/friendPicker';
import ConfirmationPage from './confirmation/confirmation';
import PlacesSearch from './search/places-search';
import NameAndDetails from './name-details/name-details';

const CreateNewEvent = () => {
    const [page, setPage] = useState(1);
    const [readyToConfirm, setReadyToConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [placeId, setPlaceId] = useState('');


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
        // setPageTwo(true);
        // setPageThree(true);
    }, [])

    const handleNextPage = () => {
        setPage(page + 1);
    }

    if(isLoading) {
        return(
            <div>Loading....</div>
    )} else {

        switch(page) {
            case 1:
                return(
                    <div className='events-wrapper'>
                        <PlacesSearch handleClick={handleNextPage}/>
                    </div>
                )
            case 2:
                return(
                    <div className='events-wrapper'>
                    <NameAndDetails handleClick={handleNextPage}/>
                </div>
                );
            case 3: 
                return(
                    <div className='events-wrapper'>
                        <DatePicker handleClick={handleNextPage}/>
                    </div>
                );
            case 4:
                return(
                    <div className='events-wrapper'>
                        <FriendPicker handleClick={handleNextPage}/>
                    </div>
                );
            case 5:
                return(
                    <div className='events-wrapper'>
                        <ConfirmationPage />
                    </div>
                );
        }
    }
};

export default CreateNewEvent 