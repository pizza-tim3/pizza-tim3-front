import React from 'react';
import { setLoading } from './../../../../actions/eventActions';
import { 
    PlacesSearchWrap,
    PlacesSearchInner,
    PlacesHeading,
    NextStep,
    FriendCard
 } from './../../../../styles/placesSearchStyles';
import { connect } from 'react-redux';
import axios from 'axios';


const NotifyFriends = (props) => {
    const url = 'https://pizza-tim3-be.herokuapp.com/api/invited';

    const handleInvite = () => {
        props.setLoading(true);
        const newUrl = `${url}/${props.eid}`;
        axios.post(newUrl, props.friends)
            .then(res => {
                console.log(res);
            }).catch(err => console.log(err))
    }

    return(
        <PlacesSearchWrap>
            <PlacesSearchInner>
                <PlacesHeading>
                    <h2>Let your Friends know they're invited!:</h2>
                </PlacesHeading>
                <div>
                    {props.friends.map(fr => {
                        return (
                            <FriendCard key={fr.firebase_uid} className="friendWrapper">
                                <img src={fr.avatar} alt="user avatar" height="60px" width="60px"/>
                                <p>{fr.first_name} {fr.last_name}</p>
                            </FriendCard>
                        )
                    })}
                </div>
                <NextStep onClick={() => {handleInvite()}}>Send</NextStep>
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