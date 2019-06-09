import React from "react";

export default function ProfileUserInfo({
  avatar,
  slicesPerMonth,
  topping,
  username,
  first_name,
  last_name,
  crust
}) {
  return (
    <>
      <div>
        <img height="100px" width="100px" alt="UserAvatar" src={avatar} />
        <h2>
          {first_name} {last_name}
        </h2>
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
