
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useForm from '../../../../customHooks/customFormHooks';

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
        <div>
            <form onSubmit={handleSubmit} className={classes.container} noValidate>
                <TextField
                    name="date"
                    id="date"
                    label="Pick A Date"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                    onChange={handleInputChange}
                    value={inputs.date}
                />
            </form>
            <form className={classes.container} noValidate>
                <TextField
                    name="time"
                    id="time"
                    label="Pick a Time"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                    inputProps={{step: 300,}}
                    onChange={handleInputChange}
                    value={inputs.time}
                />
            </form>
            <button type='submit' onClick={() => {props.handleClick()}}>Next Step</button>
        </div>
    );
}
            
       
    


export default DatePicker