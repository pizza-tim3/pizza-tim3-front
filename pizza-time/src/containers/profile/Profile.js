import React, { useReducer } from "react";

import Nav from "../../components/home-header/home-header.js";

const Profile = () => {
  const [state, dispatch] = useReducer(
    //reducer function
    (previousState, action) => {
      switch (action.type) {
        case "SET_USERNAME":
          return { ...previousState, error: action.payload };
        case "SET_SLICES_PER_MONTH":
          return { ...previousState, error: action.payload };
        case "SET_TOPPING":
          return { ...previousState, error: action.payload };
        case "SET_CRUST":
          return { ...previousState, error: action.payload };
        case "SET_ERROR":
          return { ...previousState, error: action.payload };
        case "CLEAR_ERROR":
          return { ...previousState, error: action.payload };
        default:
          throw new Error("unexpected action type");
      }
    },
    //initial state
    { username: "", slicesPerMonth: 0, topping: "", crust: "" }
  );
  return (
    <div>
      <Nav />
      <h2> Profile Works! </h2>
    </div>
  );
};

export default Profile;
