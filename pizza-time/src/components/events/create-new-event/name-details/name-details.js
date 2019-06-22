import React, { Component } from 'react';
import useForm from '../../../../customHooks/customFormHooks';

import { NameDetailsWrap, PlacesHeading } from '../../../../styles/nameDetailsStyles';
import { connect } from 'react-redux';
import { setEventName, setEventDesc } from './../../../../actions';

class NameAndDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: "",
            eventDesc: ""
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        setEventName(this.state.eventName);
        setEventDesc(this.state.eventDesc);
        this.props.handleClick();
    }

    render() {
        return(
        <NameDetailsWrap>
            <PlacesHeading>
                <h2>Step 2: Add a name and description</h2>
            </PlacesHeading>
            <form>
                 <input
                    type='text'
                    name='eventName'
                    onChange={this.onChange}
                    value={this.state.eventName}
                    placeholder="Event Name"
                    required />
                <input 
                    type='text'
                    name='eventDesc'
                    onChange={this.onChange}
                    value={this.state.eventDesc}
                    placeholder="Event Description"
                    required />
                <div className='buttonWrap'>
                <button 
                    type='button'
                    onClick={() => {this.handleSubmit()}}>Next Step</button>
                </div>
            </form>
        </NameDetailsWrap>
        )
    }
    
}

const mstp = state => {
    console.log(state)
    return {
        eventName: state.EventReducer.eventName,
        eventDesc: state.EventReducer.eventDesc
    }
}

export default connect(mstp, {setEventName, setEventDesc})(NameAndDetails)
