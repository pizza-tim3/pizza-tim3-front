import React, { useReducer } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { Link } from "react-router-dom";
import { googleProvider } from "../../firebase/authProviders";
import { registerWithPopup } from "../register/registerUtils";

//need this import for "firebase.auth.Auth.Persistence.LOCAL" constant
import firebase from "firebase/app";
import "firebase/auth";

import { Wrap, Form } from "../../styles/registerLoginStyles.js";

export default function Login(props) {
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
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  //TODO added checks to make sure that the registered users registered on our back and
  const signInWithGoogle = async e => {
    e.preventDefault();
    try {
      // sign in/register with popup window
      const result = await firebaseApp.auth().signInWithPopup(googleProvider);
      const {
        additionalUserInfo: { isNewUser }
      } = result;
      //check to see if the users new
      if (isNewUser) {
        // register uses information on our backend
        const user = await registerWithPopup(result);
        // set state with user
        props.history.push("/");
      } else if (/**user dne on backend */ false) {
        //this would be an error on our db's part
      } else {
        //get user info from backend by uid
        props.history.push("/");
      }
      // TODO set global user info
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
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
