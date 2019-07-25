import React from 'react';
import axios from 'axios';
import {
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
    SpanWrap,
    ConfirmWrap,
    ButtonGroup
} from '../../../../styles/placesSearchStyles';
import { connect } from 'react-redux';
import Loading from '../../../loading/loading';
import { setLoading, setEID } from '../../../../actions/eventActions';
import { Link } from 'react-router-dom';

// props from create-new-event
// place={placeId}
// event={eventDetails}
// dateTime={dateTime}
// friends={friends}

const ConfirmationPage = (props) => {
    setLoading(false);
    const url = "https://pizza-tim3-be.herokuapp.com/api/events";
    let dateString = `${props.dateTime.date}: ${props.dateTime.time}`
    let date = new Date(dateString).getTime().toString();
    let newDate = new Date(dateString).toDateString();
    let newTime = new Date(dateString).toLocaleTimeString();

    //TODO: connect this method to the button and have a good response
    //set a show completed page flag and create a new component to show
    //when request was successful to let user know
    const handleSubmitData = () => {
        const id = localStorage.getItem("userFireBaseId");
        props.setLoading(true);
        let requestObject = {
            event_name: props.eventName,
            event_date: date,
            organizer: id,
            place: props.placeId,
            event_description: props.eventDesc,
            inviteOnly: props.inviteOnly
        }
        console.log(requestObject)

        axios.post('https://pizza-tim3-be.herokuapp.com/api/events/', requestObject)
            .then((res) => {
                console.log(res)
                props.setLoading(false);
                const { id } = res.data.id;
                props.setEID(id);
                props.handleClick();
            }).catch(e => {
                props.setLoading(false);
                console.log(e)
            })
    };

    return(
        <PlacesSearchWrap>
            <PlacesSearchInner>
                <PlacesHeading>
                    <h2>Confirm your event:</h2>
                </PlacesHeading>
                {props.loading ? <Loading /> :
                <>
                    <div>
                        <h2>{props.eventName}</h2>
                        <h4>{props.eventDesc}</h4>
                        <ConfirmWrap>
                            <p><SpanWrap>Location:</SpanWrap> {props.placeName}</p>
                            <p><SpanWrap>Date:</SpanWrap> {newDate}</p>
                            <p><SpanWrap>Time:</SpanWrap> {newTime}</p>
                        </ConfirmWrap>
                    </div>
                    <ButtonGroup>
                        <NextStep>
                            <Link to="/home">Cancel</Link>
                        </NextStep>
                        <NextStep onClick={() => {handleSubmitData()}}>Next</NextStep>
                    </ButtonGroup>
                </>
            }

            </PlacesSearchInner>
        </PlacesSearchWrap>
    )
}

const mstp = state => {
    return {
        uid: state.userReducer.firebase_uid,
        placeName: state.EventReducer.placeName,
        placeId: state.EventReducer.placeId,
        eventName: state.EventReducer.eventName,
        eventDesc: state.EventReducer.eventDesc,
        dateTime: state.EventReducer.dateTime,
        friends: state.EventReducer.friends,
        inviteOnly: state.EventReducer.inviteOnly,
        loading: state.EventReducer.loading
    }
}

export default connect(mstp, {setLoading, setEID})(ConfirmationPage);
