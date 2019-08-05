import React, { useState } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import { googleProvider } from "../../firebase/authProviders";
import { registerWithBackend, registerWithPopup } from "./registerUtils";
import { Link } from "react-router-dom";
import axios from 'axios';

import { Wrap, Form } from "../../styles/registerLoginStyles.js";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [isActive, setActive] = useState();

  const formValidation = () => {
    if(!email.includes('@') || !email.includes('.com') || !email.length > 6) {
      setActive(false);
      setError('Invalid Email Format');
      return
    }
    if(username.length >= 5 === false) {
      setActive(false);
      setError('Username is not long enough. Must be 5 characters or more')
      return
    }
    if(password.length >= 8 === false) {
      setActive(false);
      setError('Password is too short. Please enter a password greater than 8 characters');
      return
    }
    if(firstname.length > 1 === false || lastname.length > 1 === false) {
      setActive(false);
      setError('Please enter a first and last name');
      return
    }
    setError(null)
    setActive(true)
  }



  const submit = async(e) => {
    e.preventDefault();
    localStorage.setItem('signUpStatus', '0');
    try {
      await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.uid)
          const user = {
            email: email.toLowerCase(),
            firebase_uid: res.user.uid,
            username: username.toLowerCase(),
            first_name: firstname.toLowerCase(),
            last_name: lastname.toLowerCase()
          }

          axios.post('https://pizza-tim3-be.herokuapp.com/register', user)
            .then(res => {
              localStorage['signUpStatus'] = '1'
              localStorage.setItem('firebase_uid', res.user.uid);
            }).catch(err => console.log(err))
        })
        .catch(e => console.log(e));

    } catch (err) {
      console.log(err)
    }
  }

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
          onBlur={() => formValidation()}
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
          onBlur={() => formValidation()}
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
          onBlur={() => formValidation()}
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
          onBlur={() => formValidation()}
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
          onBlur={() => formValidation()}
        />

        {error && <p>{error}</p>}
        <button type="submit" disabled={error ? true : false}>
          Sign Up
        </button>
        <p>
          Already have an account?
          <br />
          <Link to="/login" className="link">Sign In Here</Link>
        </p>
      </Form>
    </Wrap>
  );
}
