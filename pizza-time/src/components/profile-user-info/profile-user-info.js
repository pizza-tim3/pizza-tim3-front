import React from "react";

export default function ProfileUserInfo({
  avatar,
  slicesPerMonth,
  topping,
  username,
  crust
}) {
  return (
    <>
      <div>
        <img height="100px" width="100px" alt="UserAvatar" src={avatar} />
        <h2> {username} </h2>
      </div>
      <p>
        Slices Per Month: <span>{slicesPerMonth}</span>
      </p>
      <p>
        Topping: <span>{topping}</span>
      </p>
      <p>
        Crust: <span>{crust}</span>
      </p>
    </>
  );
}
