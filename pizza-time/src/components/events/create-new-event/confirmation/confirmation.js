import React from 'react';
import axios from 'axios';
import { PlacesSearchWrap, PlacesHeading, PlacesSearchInner, NextStep, SpanWrap, ConfirmWrap} from '../../../../styles/placesSearchStyles';
import { connect } from 'react-redux';
import Loading from '../../../loading/loading';
import { setLoading, setEID } from '../../../../actions/eventActions';

// props from create-new-event
// place={placeId} 
// event={eventDetails} 
// dateTime={dateTime}
// friends={friends}

const ConfirmationPage = (props) => {
    setLoading(false);
    console.log(props)
    const url = "https://pizza-tim3-be.herokuapp.com/api/events";
    let dateString = `${props.dateTime.date}: ${props.dateTime.time}`
    let date = new Date(dateString).getTime().toString();
    let newDate = new Date(dateString).toDateString();
    let newTime = new Date(dateString).toLocaleTimeString();

    //TODO: connect this method to the button and have a good response 
    //set a show completed page flag and create a new component to show
    //when request was successful to let user know
    const handleSubmitData = () => {
        props.setLoading(true);
        let requestObject = {
            event_name: props.eventName,
            event_date: date,
            inviteOnly: props.inviteOnly,
            organizer: props.uid,
            place: props.placeId,
            event_description: props.eventDesc
        }
        
        axios.post(url, requestObject)
            .then((res) => {
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
                    <NextStep onClick={() => {handleSubmitData()}}>Next</NextStep>
                </>
            }
                
            </PlacesSearchInner>
        </PlacesSearchWrap>
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
        friends: state.EventReducer.friends,
        inviteOnly: state.EventReducer.inviteOnly,
        loading: state.EventReducer.loading
    }
}

export default connect(mstp, {setLoading, setEID})(ConfirmationPage);


// axios.post(await ("http://localhost:5500/api/events", requestObject))
//             .then(res => {
//                 if(res.status === 200) {
//                     console.log('IN REQ #3')
//                     let { eventId } = res.data;
//                     const newUrl = `${fUrl}${eventId}`;
//                     console.log(newUrl)
        
//                     axios.post(newUrl, props.friends)
                    
//                         .then(resp => {
//                             console.log('IN REQ #4')
//                             if(resp.status === 200) {
//                                 console.log(resp);
//                             } else {
//                                 console.log('IN REQ #5')
//                                 console.log('cannot find the event')
//                             }
//                         }).catch(e => console.log(e))
//                 } else {
//                     console.log('IN REQ #5')
//                     console.log('error')
//                 }
//             }).catch(e => console.log(e))