import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import UserImage from '../../../../assets/user.png';

import { FriendPickerWrap, PlacesHeading, Button } from '../../../../styles/friendPickerStyles';

import { connect } from 'react-redux';
import { setFriends } from '../../../../actions/eventActions';
import Loading from '../../../loading/loading';
import { setLoading } from '../../../../actions/eventActions';

const FriendPicker = (props) => {
    const [friends, setFriends] = useState([]);
    const [chosenFriends, setChosenFriends] = useState([]);
     
    console.log(props.firebase_uid)
    const url = `http://localhost:5500/api/friends/${props.firebase_uid}`

    useEffect(() => {
        console.log(props)
        setLoading(true);
        axios
            .get(url)
            // .then(res => console.log(res.data))
                .then(res => {
                    setFriends(res.data);
                    setLoading(false);
                })
                .catch(err => console.log(err));
    }, [])

    const addToInvited = (friend) => {
        setChosenFriends([...chosenFriends, friend]);
        setFriends(friends);
    }
    // console.log(friends && friends)
    // console.log(chosenFriends && chosenFriends)

    
    return(
        <FriendPickerWrap>
            <PlacesHeading>
                <h2>Step 4: Choose your friends</h2>
            </PlacesHeading>
            {props.loading ? <Loading /> : 
            <>
            <div>
                {friends && friends.map(friend => {
                    return(
                    <div key={friend.firebase_uid} className="friendWrapper">
                        <img src={UserImage} alt="user avatar" height="60px" width="60px"/>
                        <p>{friend.first_name} {friend.last_name}</p>
                        <button onClick={() => {addToInvited(friend)}}>+</button>
                    </div>
                )})}
            </div>
            <Button onClick={() => {props.handleClick('addFriends', chosenFriends)}}>Next Step</Button>
            </>
            }
        </FriendPickerWrap>
    );
}

const mstp = state => {
    return {
        loading: state.loading,
        uid: state.firebase_uid,
        friends: state.friends
    }
}

export default connect(mstp, {setFriends, setLoading})(FriendPicker)

//http://localhost:5500/api/users/jNpViqXD4DXmf9H2FbkQnAy10000/friends