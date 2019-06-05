import React from 'react';
import { Link } from "react-router-dom";

import { EventConfirmationWrap, Button, PlacesHeading } from '../../../../styles/eventConfirmationStyles';

const ConfirmationPage = () => {
    return(
        <EventConfirmationWrap>
            <PlacesHeading>
                <h2>Step 5: Confirm your event</h2>
            </PlacesHeading>
            <Button to="/home">Finish Up</Button>
        </EventConfirmationWrap>
    )
}

export default ConfirmationPage