import React from "react";
import { UserBox, Buttons } from '../../styles/profileUserInfoStyles';
import { connect } from "react-redux";
import UserImage from "../../assets/user.png";

function ProfileUserInfo(props) {
  return (
    <UserBox>
      <div className="userAvatar">
        { props.avatar ?
          <img alt="UserAvatar" src={props.avatar} /> :
          <img alt="UserAvatar" src={UserImage} />
        }
      </div>

      <div className="userProfile" >
        <h2>{props.first_name} {props.last_name}</h2>
        <p>{props.email}</p>
        <Buttons>
          <button>Change Password</button>
          <button>Edit Profile</button>
        </Buttons>
      </div>
    </UserBox>
  );
}

const mstp = state => {
  return {
    avatar: state.userReducer.avatar,
    email: state.userReducer.email,
    first_name: state.userReducer.first_name,
    last_name: state.userReducer.last_name
  };
};

export default connect( mstp, {})(ProfileUserInfo)
