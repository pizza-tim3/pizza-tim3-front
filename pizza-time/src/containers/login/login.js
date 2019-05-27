import React, { useReducer } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { Link } from "react-router-dom";
import { googleProvider } from "../../firebase/authProviders";

//need this import for "firebase.auth.Auth.Persistence.LOCAL" constant
import firebase from "firebase/app";
import "firebase/auth";

import { Wrap, Form } from "../../styles/registerLoginStyles.js";

export default function Login(props) {
  console.log(props);
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
      props.history.push("/");
    } catch (err) {
      // Handle Errors here.
      const errorCode = err.code;
      const errorMessage = err.message;
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const signInWithGoogle = async e => {
    e.preventDefault();
    try {
      const result = await firebaseApp.auth().signInWithPopup(googleProvider);
      // const {
      //   additionalUserInfo
      // } = result;
      //this contains user info that can be stored globally
    } catch (err) {}
  };

  return (
    <Wrap>
      <Form onSubmit={submit}>
        <h1>Pizza Time</h1>
        <input
          name="email"
          id="email"
          type="text"
          value={state.email}
          placeholder="Email"
          onChange={e => {
            dispatch({ type: "SET_EMAIL", payload: e.target.value });
          }}
        />
        <input
          name="password"
          id="password"
          type="text"
          value={state.password}
          placeholder="Password"
          onChange={e => {
            dispatch({ type: "SET_PASSWORD", payload: e.target.value });
          }}
        />
        <button type="submit">Sign In</button>
        <button onClick={signInWithGoogle} type="button">
          Sign In With Google
        </button>
        <p>
          Dont have an account?
          <br />
          <Link to="/register" className="link">
            Sign Up Here
          </Link>
        </p>
      </Form>
      {/* {state.error && <p>{state.error}</p>} */}
    </Wrap>
  );
}
