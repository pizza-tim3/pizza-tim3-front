import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase/firebaseApp";

const makeRequestWithFireBaseToken = async (url, method) => {
  //get the token off of the current user
  //idealistically this could be on some global state
  const token = await firebaseApp.auth().currentUser.getIdToken();

  const options = {
    method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: token
    }
  };
  const responseFromServer = await fetch(url, options);
  const json = await responseFromServer.json();
  console.log(json);
};

export default function Private() {
  const [uid, setUid] = useState(null);

  // the current user unique ID
  useEffect(() => {
    const setID = async () => {
      const uniqueId = await firebaseApp.auth().currentUser.uid;
      setUid(uniqueId);
    };
    setID();
  }, []);

  return (
    <div>
      <h1>This is a Private component</h1>
      <button
        onClick={() => {
          makeRequestWithFireBaseToken(
            "http://localhost:5500/restricted",
            "get"
          );
        }}
      >
        Make Private Request
      </button>
      <button
        onClick={() => {
          makeRequestWithFireBaseToken(
            `http://localhost:5500/restricted/${uid}`,
            "get"
          );
        }}
      >
        Make Private User Specific Request
      </button>
      <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>
    </div>
  );
}
