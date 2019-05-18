import React, { useState } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { googleProvider } from "../../firebase/authProviders";
import { Link } from "react-router-dom";

import { Wrap, Form } from "../../styles/registerLoginStyles.js";

export default function Register(props) {
  /*These are the useState hooks.
    The first element in the array is the `value`, 
    and the second lets you set the `value`
    
    `setEmail("test@gmail.com") -> email === "test@gmail.com"
    */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //There are other values for registration needed.

  const submit = async e => {
    e.preventDefault();
    try {
      //FIREBASE LOGIC
      const user = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
      //User created; redirect or other logic here
      //TODO: make call the our backend to populate the other data.
      console.log(user);
    } catch (err) {
      // Handle Errors here.
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode, errorMessage);
      setError(errorMessage);
    }
  };

  const signInWithGoogle = async e => {
    e.preventDefault();
    try {
      const result = await firebaseApp.auth().signInWithPopup(googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const token = result.credential.accessToken;
      // The signed-in user info.
      //const user = result.user;
    } catch (err) {
      setError(err.message);
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
          value={email}
          placeholder="Email"
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <input
          name="password"
          id="password"
          type="text"
          value={password}
          placeholder="Password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign Up</button>
        <button onClick={signInWithGoogle} type="button">
          Sign In With Google
        </button>
        <p>
          Already have an account?
          <br />
          <Link to="/login" className="link">
            Sign In Here
          </Link>
        </p>
      </Form>
      {/* {error && <p>{error}</p>} */}
    </Wrap>
  );
}
