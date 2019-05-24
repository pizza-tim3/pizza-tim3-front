import React, {useState, useEffect} from 'react';
import './events.css';

import Nav from '../home-header/home-header.js';
import Footer from '../footer/footer.js';
import PlacesSearch from './search/places-search.js';
import DatePicker from './date/date-picker';
import FriendPicker from './friendPicker/friendPicker';
import ConfirmationPage from './confirmation/confirmation';

const CreateNewEvent = () => {
    const [pageOne, setPageOne] = useState(false);
    const [pageTwo, setPageTwo] = useState(false);
    const [pageThree, setPageThree] = useState(false);
    const [readyToConfirm, setReadyToConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
        setPageOne(true);
        // setPageTwo(true);
        // setPageThree(true);
    }, [])

    const handlePageTwo = () => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1000)
        setPageOne(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
        setPageTwo(true);
    }

    const handlePageThree = () => {
        setPageTwo(false);
        setPageThree(true);
    }

    const handleConfirmationScreen = () => {
        setPageThree(false);
        setReadyToConfirm(true);
    }


    if(isLoading) {
        return(
            <div>Loading....</div>
    )} else {

        if(pageOne) {
            return(
                <div className='events-wrapper'>
                <Nav />
                <PlacesSearch handleClick={handlePageTwo}/>
                <Footer />
                </div>
            )
        } else if(pageTwo) {
            return(
                <div className='events-wrapper'>
                <Nav />
                <DatePicker handleClick={handlePageThree}/>
                <Footer />
                </div>
            )
        } else if(pageThree) {
            return(
                <div className='events-wrapper'>
                <Nav />
                <FriendPicker handleClick={handleConfirmationScreen}/>
                <Footer />
                </div>
            )
        } else if (readyToConfirm) {
            return(
                <div className='events-wrapper'>
                <Nav />
                <ConfirmationPage />
                <Footer />
                </div>
            )
        }

}

    // return(
    //     <div className='events-wrapper'>
    //         <Nav />
    //         <PlacesSearch />
    //         <Footer />
    //     </div>
    // );
};

export default CreateNewEvent 