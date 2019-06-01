import React from 'react';
import useForm from '../../../../customHooks/customFormHooks';

const NameAndDetails = (props) => {
    const submit = () => {
        console.log('added');
    }

    const {inputs, handleInputChange, handleSubmit} = useForm(submit);

    console.log('inputs',inputs.eventName, inputs.eventDesc)
    return(
        <div className="places-search-wrapper">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name:</label>
                    <input type='text' name='eventName' onChange={handleInputChange} value={inputs.eventName || ''} required/>
                </div>
                <div>
                    <label>Event Description:</label>
                    <input type='text' name='eventDesc' onChange={handleInputChange} value={inputs.eventDesc || ''} required/>
                </div>
                <div>
                    <button type='submit' onClick={() => {props.handleClick()}}>Next Step</button>
                </div>
            </form>
        </div>
    )
}

export default NameAndDetails