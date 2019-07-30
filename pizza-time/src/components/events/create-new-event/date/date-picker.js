import React, { useState } from 'react';
import useForm from '../../../../customHooks/customFormHooks';
import {
    PlacesSearchWrap,
    PlacesSearchInner,
    PlacesHeading,
    Form,
    NextStep,
    ButtonGroup
} from '../../../../styles/placesSearchStyles';
import { setDateTime } from './../../../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const DatePicker = (props) => {
    const [showError, setError] = useState(false);

    const sendData = () => {
        let dateTime = {
            date: inputs.date,
            time: inputs.time
        }
        props.setDateTime(dateTime);
        props.handleClick();
    }

    const handleClick = () => {
        if(inputs.date === undefined || inputs.time === undefined) {
            setError(true);
        } else {
            setError(false);
            handleSubmit();
        }
    }

    // const classes = useStyles();
    const {inputs, handleInputChange, handleSubmit} = useForm(sendData);

    return (
        <PlacesSearchWrap>
            <PlacesHeading>
                <h2>When is it?</h2>
            </PlacesHeading>
            <PlacesSearchInner>
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

                {showError ? (
                    <div className="error">You must fill out all sections!</div>
                ) : <></>}

                <ButtonGroup>
                    <NextStep>
                        <Link to="/home">Cancel</Link>
                    </NextStep>
                    <NextStep type='submit' onClick={() => {handleClick()}}>Next Step</NextStep>
                </ButtonGroup>
            </PlacesSearchInner>
        </PlacesSearchWrap>
    )};

const mstp = state => {
    return {
        eventName: state.EventReducer.eventName,
        eventDesc: state.EventReducer.eventDesc
    }
}

export default connect(mstp, {setDateTime})(DatePicker)