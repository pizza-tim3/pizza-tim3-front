import React, { useReducer } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { Link } from "react-router-dom";
import { googleProvider } from "../../firebase/authProviders";
import { registerWithPopup } from "../register/registerUtils";

import firebase from "firebase/app";
import "firebase/auth";

import { Wrap, Form } from "../../styles/registerLoginStyles.js";

export default function Login(props) {
  const [state, dispatch] = useReducer(
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
        case "INPUT_ERROR":
          return { ...previousState, inputError: action.payload };
        default:
          throw new Error("unexpected action type");
      }
    },

    { email: "", password: "", error: "", inputError: false }
  );

  const submit = async e => {
    e.preventDefault();
    console.log(state.email.length);
    if (state.email.length === 0 || state.password.length === 0) {
      state.inputError = true;
      dispatch({ type: "SET_ERROR", payload: "" });
      dispatch({ type: "INPUT_ERROR", payload: "Both fields are required." });

      console.log(state.inputError);
    } else {
      dispatch({ type: "INPUT_ERROR", payload: "" });

      try {
        await firebaseApp
          .auth()
          .setPersistence(
            firebase.auth.Auth.Persistence.LOCAL /* | [.SESSION,| .NONE]*/
          );

        //Sign in with registered Email and password
        const user = await firebaseApp
          .auth()
          .signInWithEmailAndPassword(state.email, state.password);
        console.log(user);
        //get the token off of the current user
        //token to send to the backend to display data
        const token = await firebaseApp.auth().currentUser.getIdToken();
        props.history.push("/home");
      } catch (err) {
        console.log(err);
        // if
        dispatch({ type: "SET_ERROR", payload: err.code });
      }
    }
  };

  //TODO added checks to make sure that the registered users registered on our back and
  const signInWithGoogle = async e => {
    e.preventDefault();
    try {
      // sign in/register with popup window
      const result = await firebaseApp.auth().signInWithPopup(googleProvider);

      const {
        additionalUserInfo: { isNewUser },
      } = result;
      //check to see if the users new
      if (isNewUser) {
        // register uses information on our backend
        const user = await registerWithPopup(result);
        // set state with user
        props.history.push("/home");
      } else if (/**user dne on backend */ false) {
        //this would be an error on our db's part
      } else {
        //get user info from backend by uid
        props.history.push("/home");
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
          type="password"
          value={state.password}
          placeholder="Password"
          onChange={e => {
            dispatch({ type: "SET_PASSWORD", payload: e.target.value });
          }}
        />
        <div className="login-errors">
          {state.inputError.length > 0 ? (
            <p>Both fields are required</p>
          ) : (
            <></>
          )}
        </div>
        <div className="login-errors">
          {state.error.length > 0 ? (
            <p>Credentials don't match our records</p>
          ) : (
            <></>
          )}
        </div>
        <button type="submit">Sign In</button>
        <button onClick={signInWithGoogle} type="button">
          Google Sign In
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
