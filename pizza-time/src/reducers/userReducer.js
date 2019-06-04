import { SET_USER } from "../actions";

const initialState = {
  user: {},
  friends: [],
  favorites: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ERROR:
    //   return {
    //     ...state,
    //     error: action.payload
    //   };
    default:
      return state;
  }
};
