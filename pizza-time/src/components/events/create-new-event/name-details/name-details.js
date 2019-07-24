import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEventName, setEventDesc, setInviteOnly } from './../../../../actions';
import {
    PlacesSearchWrap,
    PlacesHeading,
    PlacesSearchInner,
    NextStep,
    Form,
    InviteOnlyWrap,
    ButtonGroup
} from '../../../../styles/placesSearchStyles';
import { Link } from 'react-router-dom';

class NameAndDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: "",
            eventDesc: "",
            inviteOnly: false,
            yesSelected: false,
            noSelected: false
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleYes = () => {
        this.setState({
            ...this.state,
            inviteOnly: true,
            yesSelected: !this.yesSelected
        })
    };

    handleNo = () => {
        this.setState({
            ...this.state,
            inviteOnly: false,
            noSelected: !this.noSelected
        })
    }

    handleSubmit = () => {
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
                        <span>Invite-Only?</span>
                        <button className={this.state.yesSelected ? "active" : ""} type='button' name="yes" onClick={() => this.handleYes()}>
                            Yes
                        </button>
                        <button className={this.state.noSelected ? "active" : ""} type='button' name="no" onClick={() => this.handleNo()}>
                            No
                        </button>
                    </InviteOnlyWrap>

                    <ButtonGroup>
                            <NextStep>
                                <Link to="/home">Cancel</Link>
                            </NextStep>
                            <NextStep
                                type='button'
                                onClick={() => {this.handleSubmit()}}>
                                    Next Step
                            </NextStep>
                    </ButtonGroup>
                </Form>
            </PlacesSearchInner>
        </PlacesSearchWrap>
        )
    }

}

const mstp = state => {
    return {
        eventName: state.EventReducer.eventName,
        eventDesc: state.EventReducer.eventDesc,
        inviteOnly: state.EventReducer.inviteOnly
    }
}

export default connect(mstp, {setEventName, setEventDesc, setInviteOnly})(NameAndDetails)
