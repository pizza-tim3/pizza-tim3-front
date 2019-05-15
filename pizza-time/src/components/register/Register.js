import React, { useState } from "react";
import firebaseApp from "../../firebase/firebaseApp";

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
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="text"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="text"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
