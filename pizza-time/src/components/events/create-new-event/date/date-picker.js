import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useForm from '../../../../customHooks/customFormHooks';
import { DatePickerWrap } from '../../../../styles/datePickerStyles';

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
            <form onSubmit={handleSubmit} className={classes.container} noValidate>
                <TextField
                    name="date"
                    id="date"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={handleInputChange}
                    value={inputs.date}
                />
            </form>
            <form className={classes.container} noValidate>
                <TextField
                    name="time"
                    id="time"
                    type="time"
                    defaultValue="07:30"
                    onChange={handleInputChange}
                    value={inputs.time}
                />
            </form>
            <button type='submit' onClick={() => {props.handleClick()}}>Next Step</button>
        </DatePickerWrap>
    );
}
            
       
    


export default DatePicker