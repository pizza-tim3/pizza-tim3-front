import React from 'react';
import useForm from '../../../../customHooks/customFormHooks';

import { NameDetailsWrap, PlacesHeading } from '../../../../styles/nameDetailsStyles';

const NameAndDetails = (props) => {
    
    const sendData = () => {
        let eventDetails = {
            eventName: inputs.eventName,
            eventDesc: inputs.eventDesc
        }
        props.handleClick('event', eventDetails);
    }

    const {inputs, handleInputChange, handleSubmit} = useForm(sendData);

    console.log('inputs',inputs.eventName, inputs.eventDesc)
    return(
        <NameDetailsWrap>
            <PlacesHeading>
                <h2>Step 2: Add a name and description</h2>
            </PlacesHeading>
            <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='eventName'
                        onChange={handleInputChange}
                        value={inputs.eventName || ''}
                        placeholder="Event Name"
                        required />
                    <input 
                        type='text'
                        name='eventDesc'
                        onChange={handleInputChange}
                        value={inputs.eventDesc || ''}
                        placeholder="Event Description"
                        required />
                    <div className='buttonWrap'>
                        {/* <div className='buttonIcon'></div> */}
                        <button 
                            type='submit'
                            onClick={() => {handleSubmit()}}>Next Step</button>
                    </div>
            </form>
        </NameDetailsWrap>
    )
}

export default NameAndDetails