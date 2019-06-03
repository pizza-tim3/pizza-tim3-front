import React from 'react';
import useForm from '../../../../customHooks/customFormHooks';

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
        <div className="places-search-wrapper">
                <div>
                    <label>Event Name:</label>
                    <input type='text' name='eventName' onChange={handleInputChange} value={inputs.eventName || ''} required/>
                </div>
                <div>
                    <label>Event Description:</label>
                    <input type='text' name='eventDesc' onChange={handleInputChange} value={inputs.eventDesc || ''} required/>
                </div>
                <div>
                    <button onClick={() => {handleSubmit()}}>Next Step</button>
                </div>
        </div>
    )
}

export default NameAndDetails