import React from 'react';
import axios from 'axios';
import { EventConfirmationWrap, Button, PlacesHeading } from '../../../../styles/eventConfirmationStyles';
import { connect } from 'react-redux';

// props from create-new-event
// place={placeId} 
// event={eventDetails} 
// dateTime={dateTime}
// friends={friends}

const ConfirmationPage = (props) => {
    console.log(props)
    const url = "http://localhost:5500/api/events";
    const fUrl = "http://localhost:5500/api/invited/";

    let dateString = new Date(props.dateTime);
    dateString = dateString.getTime();

    let newDate = new Date(dateString * 1000).toDateString();

    //TODO: connect this method to the button and have a good response 
    //set a show completed page flag and create a new component to show
    //when request was successful to let user know
    const handleSubmitData = async() => {
        // console.log(props.user)
        let requestObject = {
            event_name: props.eventName,
            event_description: props.eventDesc,
            event_date: dateString,
            organizer: props.user,
            place: props.place.placeId
        }

        let res = await axios.post(url, requestObject);

        if(res.request.status === 200) {
            let { eventId } = res.data;
            const newUrl = `${fUrl}${eventId}`;

            axios.post(newUrl, props.friends)
                .then(resp => {
                    if(resp.status === 200) {
                        console.log(resp);
                    } else {
                        console.log('cannot find the event')
                    }
                }).catch(e => console.log(e))
        } else {
            console.log('error')
        }
    };
    
    return(
        <EventConfirmationWrap>
            <PlacesHeading>
                <h2>Step 5: Confirm your event</h2>
            </PlacesHeading>
            <div>
                <h2>{props.eventName}</h2>
                <p>{props.placeName}</p>
                <p>{props.eventDesc}</p>
                <p>{newDate}</p>
                
            </div>
            <Button to="/home" onClick={() => {handleSubmitData()}}>Finish Up</Button>
        </EventConfirmationWrap>
    )
}

const mstp = state => {
    console.log(state)
    // console.log('FROM CONFIRMATION:', state.userReducer.firebase_uid);
    return {
        uid: state.userReducer.firebase_uid,
        placeName: state.EventReducer.placeName,
        placeId: state.EventReducer.placeId,
        eventName: state.EventReducer.eventName,
        eventDesc: state.EventReducer.eventDesc,
        dateTime: state.EventReducer.dateTime,
        friends: state.EventReducer.friends
    }
}

export default connect(mstp, {})(ConfirmationPage);