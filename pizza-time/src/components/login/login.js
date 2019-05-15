import React, { useReducer } from "react";
import firebaseApp from "../../firebase/firebaseApp";

//need this import for "firebase.auth.Auth.Persistence.LOCAL" constant
import firebase from "firebase/app";
import "firebase/auth";

export default function Login() {
  //state === state object, dispatch function
  const [state, dispatch] = useReducer(
    //reducer function
    (previousState, action) => {
      switch (action.type) {
        case "SET_EMAIL":
          return { ...previousState, email: action.payload };
        case "SET_PASSWORD":
          return { ...previousState, password: action.payload };
        case "SET_ERROR":
          return { ...previousState, error: action.payload };
        case "CLEAR_ERROR":
          return { ...previousState, error: action.payload };
        default:
          throw new Error("unexpected action type");
      }
    },
    //initial state
    { email: "", password: "", error: "" }
  );

  const submit = async e => {
    e.preventDefault();
    try {
      //FIREBASE LOGIC

      //set the logged in status to persist on local(client/browser) until explicitly told to logout
      await firebaseApp
        .auth()
        .setPersistence(
          firebase.auth.Auth.Persistence.LOCAL /* | [.SESSION,| .NONE]*/
        );

      //Sign in with registered Email and password
      const user = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(state.email, state.password);

      //get the token off of the current user
      //token to send to the backend to display data
      const token = await firebaseApp.auth().currentUser.getIdToken();
    } catch (err) {
      // Handle Errors here.
      const errorCode = err.code;
      const errorMessage = err.message;
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="text"
              value={state.email}
              onChange={e => {
                dispatch({ type: "SET_EMAIL", payload: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="text"
              value={state.password}
              onChange={e => {
                dispatch({ type: "SET_PASSWORD", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {state.error && <p>{state.error}</p>}
    </>
  );
}
