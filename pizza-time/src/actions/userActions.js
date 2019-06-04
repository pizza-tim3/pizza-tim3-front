export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_USER_ERROR = "SET_USER_ERROR";
export const CLEAR_USER_ERROR = "CLEAR_USER_ERROR";

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function clearUser() {
  return {
    type: SET_USER,
    payload: {}
  };
}

export function setUserError(error) {
  return {
    type: SET_USER_ERROR,
    payload: error
  };
}

export function clearUserError() {
  return {
    type: CLEAR_USER_ERROR,
    payload: ""
  };
}
