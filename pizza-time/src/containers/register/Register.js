import React, { useState } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { googleProvider } from "../../firebase/authProviders";
import { Link } from "react-router-dom";

import { Wrap, Form } from "../../styles/registerLoginStyles.js";

const registerWithBackend = async userObj => {
  const url = `${process.env.REACT_APP_BACK_END_URL}/api/users`;
  const body = userObj;
  const data = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
  return await fetch(url, data).then(res => res.json());
};

// takes the result from a register with pop up call
const registerWithPopup = async result => {
  console.log(result);
  const {
    user: { uid },
    additionalUserInfo: {
      profile: { email, family_name, given_name, name, picture }
    }
  } = result;

  // make object to send to backend
  const userObj = {
    email,
    username: name,
    first_name: given_name,
    last_name: family_name,
    firebase_uid: uid
  };
  //send information to backend
  console.log(userObj);
  const response = await registerWithBackend(userObj);
  console.log(response);
  return response;
};

export default function Register(props) {
  /*These are the useState hooks.
    The first element in the array is the `value`, 
    and the second lets you set the `value`
    
    `setEmail("test@gmail.com") -> email === "test@gmail.com"
    */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  //There are other values for registration needed.

  const submit = async e => {
    e.preventDefault();
    try {
      //FIREBASE LOGIC
      //Destructure the nested object that contains the uid
      const {
        user: { uid: firebase_uid }
      } = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
      //User created; redirect or other logic here

      // make object to send to backend
      const userObj = {
        email,
        username,
        first_name: firstname,
        last_name: lastname,
        firebase_uid
      };
      // send information to backend
      const response = await registerWithBackend(userObj);
      console.log("res", response);
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
      } else if (/**user dne on backend */ false) {
        //this would be an error on our db's part
      } else {
        //get user info from backend by uid
      }
      // TODO set global user info
    } catch (err) {
      console.log(err);
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
      {error && <p>{error}</p>}
    </Wrap>
  );
}
