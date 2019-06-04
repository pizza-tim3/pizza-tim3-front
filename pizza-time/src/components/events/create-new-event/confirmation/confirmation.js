import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { EventConfirmationWrap, Button, PlacesHeading } from '../../../../styles/eventConfirmationStyles';

// props from create-new-event
// place={placeId} 
// event={eventDetails} 
// dateTime={dateTime}
// friends={friends}

const ConfirmationPage = () => {
    const url = "http://localhost:5500/api/events"
    const {eventName, eventDesc} = props.event;
    const {date, time} = props.dateTime;
    const [requestObject, setRequestObject] = useState({});
    setRequestObject({
        event_name: eventName,
        event_description: eventDesc,
        event_date: '',
        organizer: 'jNpViqXD4DXmf9H2FbkQnAy00000',
        place: props.place_id //TODO: change all this to get the id not place_id
    })

    //TODO: connect this method to the button and have a good response 
    //set a show completed page flag and create a new component to show
    //when request was successful to let user know
    const handleSubmitData = () => {
        axios.post(url, requestObject)
                .then(res => console.log(res))
                .catch(e => console.log(e));
    };
    
    return(
        <EventConfirmationWrap>
            <PlacesHeading>
                <h2>Step 5: Confirm your event</h2>
            </PlacesHeading>
            <Button to="/home">Finish Up</Button>
        </EventConfirmationWrap>
    )
}

export default ConfirmationPage