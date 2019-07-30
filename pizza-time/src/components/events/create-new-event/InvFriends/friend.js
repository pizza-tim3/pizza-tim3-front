import React, { Component } from 'react';
import {FriendCard} from './../../../../styles/placesSearchStyles';

export default class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    handleClick = (e) => {
        if(this.props.addToInvited) {
            this.props.addToInvited(this.props.friend);
            this.handleToggle();
        } else {
            this.handleToggle();
        }
    }

    handleToggle = () => {
        console.log('clicked')
        this.setState({ active: !this.state.active });
    }

    render() {
        return (
            <FriendCard active={this.state.active} onClick={() => this.handleClick()}>
                <img src={this.props.friend.avatar} alt="user avatar" height="60px" width="60px"/>
                <p>{this.props.friend.first_name} {this.props.friend.last_name}</p>
            </FriendCard>
        )
    }
}