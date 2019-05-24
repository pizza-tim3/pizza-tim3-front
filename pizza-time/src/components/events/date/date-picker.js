
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    
    return (
        <div>
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="Pick A Date"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                />
            </form>
            <form className={classes.container} noValidate>
                <TextField
                    id="time"
                    label="Pick a Time"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
            </form>
            <button onClick={() => {props.handleClick()}}>Next Step</button>
        </div>
    );
}
            
       
    


export default DatePicker