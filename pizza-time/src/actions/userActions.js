import axios from "axios";

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

export function clearUser(user) {
  return {
    type: SET_USER,
    payload: {}
  };
}

export function setUserError(user) {
  return {
    type: SET_USER_ERROR,
    payload: user
  };
}

export function clearUserError(user) {
  return {
    type: CLEAR_USER_ERROR,
    payload: user
  };
}

/* a `POST` request to this route with the title and text in the req.body 
    will create a new note. 
    The response from the server will be the ID of the new note.
  */
// export function createNote(note, history) {
//   console.log(note);
//   return dispatch => {
//     dispatch({ type: CREATING_NOTE });
//     axios
//       .post(`https://fe-notes.herokuapp.com/note/create`, note)
//       .then(({ data: { success: createdNoteId } }) => {
//         dispatch({
//           type: NOTE_CREATED,
//           payload: { ...note, _id: createdNoteId }
//         });
//         history.push(`/note/${createdNoteId}`);
//       })
//       .catch(error => dispatch({ type: ERROR, payload: `${error}` }));
//   };
// }

// export function sortByTitleOldest() {
//   return {
//     type: SORT_BY_TITLE_OLDEST,
//     payload: "oldest"
//   };
// }
