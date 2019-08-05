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
    ButtonGroup,
    InviteOnlyButton
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
            noSelected: false,
            showError: false
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
            inviteOnly: !this.state.inviteOnly,
            yesSelected: !this.state.yesSelected,
            noSelected: false
        })
    };

    handleNo = () => {
        this.setState({
            ...this.state,
            inviteOnly: !this.state.inviteOnly,
            noSelected: !this.state.noSelected,
            yesSelected: false
        })
    }

    handleSubmit = () => {
        if(this.state.eventName === "" || this.state.eventDesc === "" || !this.state.inviteOnly) {
            this.setState({ showError: true })
        } else {
            this.setState({ showError: false })
            this.props.setEventName(this.state.eventName);
            this.props.setEventDesc(this.state.eventDesc);
            this.props.setInviteOnly(this.state.inviteOnly);
            this.props.handleClick();
        }
    }

    render() {
        return(
        <PlacesSearchWrap>
            <PlacesHeading>
                <h2>What are we doing?</h2>
            </PlacesHeading>
            <PlacesSearchInner>
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
                        <span>Invite-Only:</span>
                        <InviteOnlyButton active={this.state.yesSelected} type='button' name="yes" onClick={() => this.handleYes()}>
                            Yes
                        </InviteOnlyButton>
                        <InviteOnlyButton active={this.state.noSelected} type='button' name="no" onClick={() => this.handleNo()}>
                            No
                        </InviteOnlyButton>
                    </InviteOnlyWrap>

                    {this.state.showError ? (
                            <div className="error">You must fill out all sections!</div>
                        ) : <></>}

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
