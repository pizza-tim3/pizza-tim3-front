import React from 'react';
import useForm from '../../../../customHooks/customFormHooks';
import { 
    PlacesSearchWrap,
    PlacesSearchInner,
    PlacesHeading,
    Form,
    NextStep
} from '../../../../styles/placesSearchStyles';
import { setDateTime } from './../../../../actions';
import { connect } from 'react-redux';



const DatePicker = (props) => {

    const sendData = () => {
        let dateTime = {
            date: inputs.date,
            time: inputs.time
        }
        console.log(dateTime)
        props.setDateTime(dateTime);
        props.handleClick();
    }

    // const classes = useStyles();
    const {inputs, handleInputChange, handleSubmit} = useForm(sendData);
    
    return (
        <PlacesSearchWrap>
            <PlacesSearchInner>
                <PlacesHeading>
                    <h2>Choose a time and date</h2>
                </PlacesHeading>
                <Form noValidate>
                    <input
                        name="date"
                        id="date"
                        type="date"
                        onChange={handleInputChange}
                        value={inputs.date || ''}
                    />
                </Form>
                <Form noValidate>
                    <input
                        name="time"
                        id="time"
                        type="time"
                        onChange={handleInputChange}
                        value={inputs.time || ''}
                    />
                </Form>
                <NextStep type='submit' onClick={() => {handleSubmit()}}>Next Step</NextStep>
            </PlacesSearchInner>
        </PlacesSearchWrap>
    )};

const mstp = state => {
    console.log(state)
    return {
        eventName: state.EventReducer.eventName,
        eventDesc: state.EventReducer.eventDesc
    }
}

export default connect(mstp, {setDateTime})(DatePicker)