import React from 'react';
import useForm from '../../../../customHooks/customFormHooks';

import { NameDetailsWrap, PlacesHeading } from '../../../../styles/nameDetailsStyles';
import { connect } from 'react-redux';
import { setEventName, setEventDesc } from './../../../../actions/eventActions';

const NameAndDetails = (props) => {
    
    const sendData = () => {
        setEventName(inputs.eventName);
        setEventDesc(inputs.eventDesc);
        props.handleClick();
    }

    const {inputs, handleInputChange, handleSubmit} = useForm(sendData);

    // console.log('inputs',inputs.eventName, inputs.eventDesc)
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
                            type='button'
                            onClick={() => {handleSubmit()}}>Next Step</button>
                    </div>
            </form>
        </NameDetailsWrap>
    )
}

const mstp = state => {
    return {
        eventName: state.eventName,
        eventDesc: state.eventDesc
    }
}

export default connect(mstp, {setEventName, setEventDesc})(NameAndDetails)