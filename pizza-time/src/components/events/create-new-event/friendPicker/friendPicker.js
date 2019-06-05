import React from 'react';

import { FriendPickerWrap, PlacesHeading, Button } from '../../../../styles/friendPickerStyles';

const FriendPicker = (props) => {
    return(
        <FriendPickerWrap>
            <PlacesHeading>
                <h2>Step 4: Choose your friends</h2>
            </PlacesHeading>
            <Button onClick={() => {props.handleClick()}}>Next Step</Button>
        </FriendPickerWrap>
    );
}

export default FriendPicker 