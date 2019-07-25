import React from 'react';
import { setLoading } from './../../../../actions/eventActions';
import {
    PlacesSearchWrap,
    PlacesSearchInner,
    PlacesHeading,
    NextStep
 } from './../../../../styles/placesSearchStyles';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Friend from './friend';


const NotifyFriends = (props) => {
    const handleInvite = () => {
        props.setLoading(true);
        axios.post(`https://pizza-tim3-be.herokuapp.com/api/invited/${props.eid}`, props.friends)
            .then(res => {
                props.setLoading(false)
            }).catch(err => {
                props.setLoading(false)
                console.log(err);
            })
    }

    return(
        <PlacesSearchWrap>
            <PlacesSearchInner>
                <PlacesHeading>
                    <h2>Let your Friends know they're invited!:</h2>
                </PlacesHeading>
                <div>
                    {props.friends.map(fr => {
                        return <Friend key={fr.firebase_uid} friend={fr}/>
                    })}
                </div>
                <NextStep onClick={() => {handleInvite()}}>
                    <Link to="/home">Send</Link>
                </NextStep>
            </PlacesSearchInner>
        </PlacesSearchWrap>
    )
}

const mstp = state => {
    return {
        eid: state.EventReducer.eid,
        friends: state.EventReducer.friends,
        loading: state.EventReducer.loading
    }
}

export default connect(mstp, {setLoading})(NotifyFriends);