import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import UserImage from '../../../../assets/user.png';

import { FriendPickerWrap, PlacesHeading, Button } from '../../../../styles/friendPickerStyles';

const FriendPicker = (props) => {
    const [friends, setFriends] = useState([]);
    const [chosenFriends, setChosenFriends] = useState([]);
    

    const url = 'http://localhost:5500/api/friends/XVf2XhkNSJWNDGEW4Wh6SHpKYUt2'

    useEffect(() => {
        axios
            .get(url)
            // .then(res => console.log(res.data))
                .then(res => setFriends(res.data))
                .catch(err => console.log(err));
    }, [])

    const addToInvited = (friend) => {
        setChosenFriends([...chosenFriends, friend]);
    }
    console.log(friends && friends)
    console.log(chosenFriends && chosenFriends)

    return(
        <FriendPickerWrap>
            <PlacesHeading>
                <h2>Step 4: Choose your friends</h2>
            </PlacesHeading>
            <div>
                {friends && friends.map(friend => {
                    return(
                    <div key='friend.id' className="friendWrapper">
                        <img src={UserImage} alt="user avatar" height="60px" width="60px"/>
                        <p>{friend.first_name} {friend.last_name}</p>
                        <button onClick={() => {addToInvited(friend)}}>+</button>
                    </div>
                )})}
            </div>
            <Button onClick={() => {props.handleClick('addFriends', chosenFriends)}}>Next Step</Button>
        </FriendPickerWrap>
    );
}

export default FriendPicker 

//http://localhost:5500/api/users/jNpViqXD4DXmf9H2FbkQnAy10000/friends