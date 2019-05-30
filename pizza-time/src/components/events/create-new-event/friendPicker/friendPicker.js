import React from 'react';

const FriendPicker = (props) => {
    return(
        <div>
            FriendsList Works!
            <button onClick={() => {props.handleClick()}}>Next Step</button>
        </div>
    );
}

export default FriendPicker 