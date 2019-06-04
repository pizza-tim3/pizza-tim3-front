import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useForm from '../../../../customHooks/customFormHooks';
import { DatePickerWrap, PlacesHeading, Form, Button } from '../../../../styles/datePickerStyles';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


const DatePicker = (props) => {
    const classes = useStyles();
    const {inputs, handleInputChange, handleSubmit} = useForm();
    
    return (
        <DatePickerWrap>
            <PlacesHeading>
                <h2>Step 3: Choose a time and date</h2>
            </PlacesHeading>
            <Form onSubmit={handleSubmit} className={classes.container} noValidate>
                <input
                    name="date"
                    id="date"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={handleInputChange}
                    value={inputs.date}
                />
            </Form>
            <Form className={classes.container} noValidate>
                <input
                    name="time"
                    id="time"
                    type="time"
                    defaultValue="07:30"
                    onChange={handleInputChange}
                    value={inputs.time}
                />
            </Form>
            <Button type='submit' onClick={() => {props.handleClick()}}>Next Step</Button>
        </DatePickerWrap>
    );
}
            
       
    


export default DatePicker