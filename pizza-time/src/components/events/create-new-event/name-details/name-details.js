import React, { Component } from 'react';
import useForm from '../../../../customHooks/customFormHooks';
import { connect } from 'react-redux';
import { setEventName, setEventDesc } from './../../../../actions';
import { 
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
    Form
} from '../../../../styles/placesSearchStyles';

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
        console.log(this.state.eventName, this.state.eventDesc)
        this.props.setEventName(this.state.eventName);
        this.props.setEventDesc(this.state.eventDesc);
        this.props.handleClick();
    }

    render() {
        return(
        <PlacesSearchWrap>
            <PlacesSearchInner>
                <PlacesHeading>
                    <h2>Add your event name and description</h2>
                </PlacesHeading>
                <Form>
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
                    <NextStep 
                        type='button'
                        onClick={() => {this.handleSubmit()}}>
                            Next Step
                    </NextStep>
                    </div>
                </Form>
            </PlacesSearchInner>
        </PlacesSearchWrap>
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
