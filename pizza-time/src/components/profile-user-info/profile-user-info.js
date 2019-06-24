import React, { useContext } from "react";
import { CurrentUser } from "../../contexts/CurrentUser";

export default function ProfileUserInfo() {
  const user = useContext(CurrentUser);
  console.log(user);
  const {
    avatar,
    first_name,
    last_name,
    slices,
    topping,
    crust,
    state,
    city
  } = user;

  return (
    <>
      <div>
        <img height="100px" width="100px" alt="UserAvatar" src={avatar} />
        <h2>
          {first_name} {last_name}
        </h2>
      </div>
      <p>
        Slices Per Month: <span>{slices}</span>
      </p>
      <p>
        Topping: <span>{topping}</span>
      </p>
      <p>
        Crust: <span>{crust}</span>
      </p>
      <p>
        <span>{city}</span>, <span>{state}</span>
      </p>
    </>
  );
}
