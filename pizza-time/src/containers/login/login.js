import React, { useReducer, useEffect } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    if(localStorage.getItem('signUpStatus')) {
      localStorage.removeItem('signUpStatus')
    }
  }, [])

  const formValidation = () => {
    if (state.email.length === 0 || state.password.length === 0) {
      state.inputError = true;
      dispatch({ type: "SET_ERROR", payload: "" });
      dispatch({ type: "INPUT_ERROR", payload: "Both fields are required." });

      console.log(state.inputError);
    } else {
      dispatch({ type: "INPUT_ERROR", payload: "" });
    }
  }

  const submit = async e => {
    e.preventDefault();
    console.log('called')
    formValidation();
    try {
      firebaseApp.auth().signInWithEmailAndPassword(state.email, state.password).catch(e => {
        console.log(e)
        dispatch({ type: "SET_ERROR", payload: e.code })
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_ERROR", payload: err.code });
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
