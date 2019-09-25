
import React, { Component } from "react";
import { Button, FriendInfoContainer } from "../../styles/profileStyles";
import UserImage from '../../assets/user.png';
import axios from 'axios';

// props from FriendsList
// friend={friend} key={friend.firebase_uid}

export default class FriendCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      uid: localStorage.getItem('firebase_uid'),
    }
  }

  handleAccept = () => {
    const { uid } = this.state;
    const {firebase_uid} = this.props.friend
    const url = `https://pizza-tim3-be.herokuapp.com/api/friends/accept/${uid}/${firebase_uid}`;
    axios.get(url)
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e))
  }

  handleDecline = () => {
    console.log('decline')
    const uid = this.state.uid;
    const firebase_uid = this.props.friend.firebase_uid;
    const url = `https://pizza-tim3-be.herokuapp.com/api/friends/reject/${uid}/${firebase_uid}`;
    axios.get('https://pizza-tim3-be.herokuapp.com/api/friends/reject/' + uid + firebase_uid)
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e))
  }

  render() {
    console.log(this.props)
    return(
      <FriendInfoContainer>
        <img className="user" src={this.props.avatar ? this.props.avatar : UserImage} alt="user's avatar" />
        <h4>{this.props.friend.first_name} {this.props.friend.last_name}</h4>
        <Button onClick={() => this.handleAccept()}>Accept</Button>
        <Button onClick={() => this.handleDecline()}>Reject</Button>
      </FriendInfoContainer>
    )
  }
}
//kept getting an error while destructing in the params
// function FriendCard({
//   friend: {
//     id,
//     status,
//     avatar,
//     first_name,
//     last_name,
//     firebase_uid: friend_uid,
//   },
//   userReducer: { firebase_uid },
// }) {
//   const [pending, setPending] = useState(status === "pending");

//   //really need to write a function that lets you make authenticated reqs
//   // api/friends/accept/:user_uid/:friend_uid
//   const request = async url => {
//     const response = await fetch(url);
//     const json = await response.json();
//     setPending(false);
//   };



//   return (
//     <FriendInfoContainer key={id} status={status}>
//       <img className="user" src={avatar ? avatar : UserImage} alt="user's avatar" />
//       <h4>
//         {first_name} {last_name}
//       </h4>
//       {pending ? (
//         <Button
//           onClick={() =>
//             request(
//               `${backend}/api/friends/accept/${firebase_uid}/${friend_uid}`
//             )
//           }
//         >
//           Accept
//         </Button>
//       ) : null}
//       {pending ? (
//         <Button
//           onClick={() =>
//             request(
//               `${backend}/api/friends/reject/${firebase_uid}/${friend_uid}`
//             )
//           }
//         >
//           Reject
//         </Button>
//       ) : null}
//     </FriendInfoContainer>
//   );
// }

// const mstp = state => state;

// export default connect(
//   mstp,
//   {}
// )(FriendCard);
