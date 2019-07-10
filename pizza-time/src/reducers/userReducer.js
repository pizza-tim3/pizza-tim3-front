import {
  SET_USER,
  CLEAR_USER,
  SET_USER_ERROR,
  CLEAR_USER_ERROR,
} from "../actions";

const initialState = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  location: "",
  avatar: "",
  crust: "",
  topping: "",
  slicesPerMonth: "",
  error: null,
  firebase_uid: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log('USER', action.payload)
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        location: "",
        uid: "",
        avatar: "",
        crust: "",
        topping: "",
        slicesPerMonth: "",
        firebase_uid: "",
      };
    case SET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
