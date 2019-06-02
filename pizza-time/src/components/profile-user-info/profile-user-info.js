import React from "react";

export default function ProfileUserInfo(props) {
  return (
    <>
      <div>
        <img height="100px" width="100px" alt="UserAvatar" />
        <h2> USERNAME </h2>
      </div>
      <p>
        Slices Per Month: <span>{props.slicesPerMonth}</span>
      </p>
      <p>
        Topping: <span>{props.topping}</span>
      </p>
      <p>
        Crust: <span>{props.crust}</span>
      </p>
    </>
  );
}
