import React from "react";
import { UserBox } from '../../styles/profileUserInfoStyles';

export default function ProfileUserInfo({
  avatar,
  slices,
  topping,
  username,
  first_name,
  last_name,
  crust
}) {
  return (
    <UserBox>
      <div className="userAvatar">
        <img alt="UserAvatar" src={avatar} />
      </div>
      
      <div className="userProfile" >
        <h2>{first_name} {last_name}</h2>
        <p>Slices Per Month: <span>{slices}</span></p>
        <p>Topping: <span>{topping}</span></p>
        <p>Crust: <span>{crust}</span></p>
        <button>Edit Profile</button>
      </div>
    </UserBox>
  );
}
