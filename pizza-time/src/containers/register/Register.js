import React, { useState } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { googleProvider } from "../../firebase/authProviders";
import { registerWithBackend, registerWithPopup } from "./registerUtils";
import { Link } from "react-router-dom";

import { Wrap, Form } from "../../styles/registerLoginStyles.js";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      //Destructure the nested object that contains the uid
      const {user: { uid: firebase_uid }} = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const userObj = {
        email,
        username,
        first_name: firstname,
        last_name: lastname,
        firebase_uid
      };

      const response = await registerWithBackend(userObj);
      props.history.push("/home");
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      setError(errorMessage);
    }
  };

  const signInWithGoogle = async e => {
    e.preventDefault();
    try {
      // sign in/register with popup window
      const result = await firebaseApp.auth().signInWithPopup(googleProvider);
      const { additionalUserInfo: { isNewUser }} = result;
      //check to see if the users new
      if (isNewUser) {
        //get user picture and other stuff to add onto result
        // register uses information on our backend
        const user = await registerWithPopup(result);
        // set state with user
        props.history.push("/home");
      } else if (/**user dne on backend */ false) {
        //this would be an error on our db's part
      } else {
        props.history.push("/home");
      }
      // TODO set global user info
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
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <input
          name="username"
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <input
          name="firstname"
          id="firstname"
          type="text"
          value={firstname}
          placeholder="First name"
          onChange={e => {
            setFirstname(e.target.value);
          }}
        />
        <input
          name="lastname"
          id="lastname"
          type="text"
          value={lastname}
          placeholder="Last name"
          onChange={e => {
            setLastname(e.target.value);
          }}
        />
        <button type="submit">Sign Up</button>
        <button onClick={signInWithGoogle} type="button">Google Sign In</button>
        <p>
          Already have an account?
          <br />
          <Link to="/login" className="link">Sign In Here</Link>
        </p>
      </Form>
      {error && <p>{error}</p>}
    </Wrap>
  );
}
