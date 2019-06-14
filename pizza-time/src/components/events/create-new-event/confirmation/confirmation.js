import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { EventConfirmationWrap, Button, PlacesHeading } from '../../../../styles/eventConfirmationStyles';
import Moment from 'react-moment';

// props from create-new-event
// place={placeId} 
// event={eventDetails} 
// dateTime={dateTime}
// friends={friends}

const ConfirmationPage = (props) => {
    const url = "http://localhost:5500/api/events"
    const {eventName, eventDesc} = props.event;
    const {date, time} = props.dateTime;
    const [requestObject, setRequestObject] = useState({});
    let dateString = new Date(`${date && date} ${time && time}`);
    dateString = dateString.getTime();

    let newDate = new Date(dateString).toDateString();
    let timeString = `${newDate} ${time}:00`;
    // let newTime = moment(timeString).format();
    //TODO: connect this method to the button and have a good response 
    //set a show completed page flag and create a new component to show
    //when request was successful to let user know
    const handleSubmitData = () => {
        let requestObject = {
            event_name: eventName,
            event_description: eventDesc,
            event_date: dateString,
            organizer: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
            place: props.place
        }
        axios.post(url, requestObject)
                .then(res => console.log(res))
                .catch(e => console.log(e));
    };
    
    return(
        <EventConfirmationWrap>
            <PlacesHeading>
                <h2>Step 5: Confirm your event</h2>
            </PlacesHeading>
            <div>
                <h2>{eventName && eventName}</h2>
                <p>{eventDesc && eventDesc}</p>
                <p>{newDate}</p>
                <p>{time}</p>
            </div>
            <Button to="/home" onClick={() => {handleSubmitData()}}>Finish Up</Button>
        </EventConfirmationWrap>
    )
}

export default ConfirmationPage