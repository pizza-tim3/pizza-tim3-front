import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEventName, setEventDesc, setInviteOnly } from './../../../../actions';
import { 
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
    Form,
    InviteOnlyWrap
} from '../../../../styles/placesSearchStyles';

class NameAndDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: "",
            eventDesc: "",
            inviteOnly: false
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleBool = (val) => {
        console.log("Button clicked:", val)
        let newVal;
        switch(val) {
            case "Yes":
                newVal = true;
                break;
            case "No":
                newVal = false;
                break;
        }

        this.setState({
            ...this.state,
            inviteOnly: newVal
        });

        console.log(this.state.inviteOnly)
    };

    handleSubmit = () => {
        console.log(this.state.eventName, this.state.eventDesc)
        this.props.setEventName(this.state.eventName);
        this.props.setEventDesc(this.state.eventDesc);
        this.props.setInviteOnly(this.state.inviteOnly);
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

                    <InviteOnlyWrap className="inviteOnly">
                        <span>Invite-Only?:</span>
                        <button type='button' name="yes" onClick={() => this.handleBool("Yes")}>
                            Yes
                        </button>
                        <button type='button' name="no" onClick={() => this.handleBool("No")}>
                            No
                        </button>
                    </InviteOnlyWrap>

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
        eventDesc: state.EventReducer.eventDesc,
        inviteOnly: state.EventReducer.inviteOnly
    }
}

export default connect(mstp, {setEventName, setEventDesc, setInviteOnly})(NameAndDetails)
