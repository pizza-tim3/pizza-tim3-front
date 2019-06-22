import React from 'react';
import useForm from '../../../../customHooks/customFormHooks';
import { 
    DatePickerWrap,
    PlacesHeading,
    Form,
    Button
} from '../../../../styles/datePickerStyles';
import { setDateTime } from './../../../../actions';
import { connect } from 'react-redux';



const DatePicker = (props) => {

    const sendData = () => {
        let dateTime = {
            date: inputs.date,
            time: inputs.time
        }
        console.log(dateTime)
        setDateTime(dateTime);
        props.handleClick();
    }

    // const classes = useStyles();
    const {inputs, handleInputChange, handleSubmit} = useForm(sendData);
    
    return (
        <DatePickerWrap>
            <PlacesHeading>
                <h2>Step 3: Choose a time and date</h2>
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
            <Button type='submit' onClick={() => {handleSubmit()}}>Next Step</Button>
        </DatePickerWrap>
    )};

const mstp = state => {
    console.log(state)
    return {
        eventName: state.EventReducer.eventName,
        eventDesc: state.EventReducer.eventDesc
    }
}

export default connect(mstp, {setDateTime})(DatePicker)