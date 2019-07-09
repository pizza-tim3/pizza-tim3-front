import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { EventReducer } from "./eventReducer";
// import { otherReducer } from "./otherReducer"; <--EXAMPLE; otherReducer does not exist

export default combineReducers({
  userReducer,
  EventReducer
  /**otherReducer */
});
