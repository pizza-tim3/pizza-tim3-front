import React, { Component } from "react";
import { connect } from "react-redux";
import { Wrap, ProfileListContainer, ListToolBar } from "../../styles/profileStyles";
import axios from 'axios';
import FriendSearchBox from "../../components/friend-search-box/friend-search-box";
import FriendCard from "../friend-card/FriendCard";

export default class FriendsList extends  Component{
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      pending: []
    }
  }

  componentDidMount() {
    const uid = localStorage.getItem('firebase_uid')
    axios.get(`https://pizza-tim3-be.herokuapp.com/api/friends/${uid}`)
      .then(res => {
        console.log(res)
        const pendingFriends = res.data.filter(i => {
          return i.status === 'pending'
        })

        const currentFriends = res.data.filter(i => {
          return i.status !== 'pending'
        })

        this.setState({
          ...this.state,
          friends: currentFriends,
          pending: pendingFriends
        })
      })
  }


  render() {
    return (
      <Wrap>
        <ListToolBar>
          <FriendSearchBox />
        </ListToolBar>
        <ProfileListContainer>
          <h3>Pending Invites</h3>
          {this.state.pending.map(friend => (
            <FriendCard friend={friend} key={friend.firebase_uid} />
          ))}

        <div>
          <h3>Friends</h3>
          {this.state.friends.map(friend => (
            <FriendCard friend={friend} key={friend.firebase_uid} />
          ))}
        </div>
        </ProfileListContainer>

      </Wrap>
    );
  }
};

