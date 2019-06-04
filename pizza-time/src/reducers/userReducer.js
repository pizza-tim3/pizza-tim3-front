import {
  SET_USER,
  CLEAR_USER,
  SET_USER_ERROR,
  CLEAR_USER_ERROR
} from "../actions";

const initialState = {
  firstname: "",
  lastname: "",
  username: "",
  location: "",
  uid: "",
  avatar: "",
  crust: "",
  topping: "",
  slicesPerMonth: "",
  error: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_USER:
      return {
        ...state,
        firstname: "",
        lastname: "",
        username: "",
        location: "",
        uid: "",
        avatar: "",
        crust: "",
        topping: "",
        slicesPerMonth: ""
      };
    case SET_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};