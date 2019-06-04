import React, {useState, useEffect} from 'react';
import useForm from '../../../../customHooks/customFormHooks';
import { NameDetailsWrap } from '../../../../styles/nameDetailsStyles';

const NameAndDetails = (props) => {
    const submit = () => {
        console.log('added');
    }

    const {inputs, handleInputChange, handleSubmit} = useForm(submit);

    console.log('inputs',inputs.eventName, inputs.eventDesc)
    return(
        <NameDetailsWrap>
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
                            onClick={() => {props.handleClick()}}>Next Step</button>
                    </div>
            </form>
        </NameDetailsWrap>
    )
}

export default NameAndDetails