import React from 'react';
import useForm from '../../../../customHooks/customFormHooks';
import { 
    DatePickerWrap,
    PlacesHeading,
    Form,
    Button
} from '../../../../styles/datePickerStyles';


const DatePicker = (props) => {

    const sendData = () => {
        let dateTime = {
            date: inputs.date,
            time: inputs.time
        }
        props.handleClick('dateTime', dateTime);
    }

    const classes = useStyles();
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
                    defaultValue="2017-05-24"
                    onChange={handleInputChange}
                    value={inputs.date}
                />
            </Form>
            <Form noValidate>
                <input
                    name="time"
                    id="time"
                    type="time"
                    defaultValue="07:30"
                    onChange={handleInputChange}
                    value={inputs.time}
                />
            </Form>
            <Button type='submit' onClick={() => {handleSubmit()}}>Next Step</Button>
        </DatePickerWrap>
    )};

export default DatePicker