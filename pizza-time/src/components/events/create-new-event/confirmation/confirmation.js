import React from 'react';
import { Link } from "react-router-dom";

// props from create-new-event
// place={placeId} 
// event={eventDetails} 
// dateTime={dateTime}
// friends={friends}

const ConfirmationPage = (props) => {

    const {eventName, eventDesc} = props.event;
    const {date, time} = props.dateTime;

    //TODO: ADD METHOD TO POST THE EVENT DATA TO API

    return(
        <div>
            <h1>Confirmation Page</h1>
            <p>{eventName}</p>
            <p>{eventDesc}</p>
            <p>{props.place}</p>
            <p>{date}</p>
            <p>{time}</p>
            <p>Friends goes here</p>
            <button>
                <Link to="/home" className="link">
                    Finish Up
                </Link>
            </button>
        </div>
    )
}

export default ConfirmationPage