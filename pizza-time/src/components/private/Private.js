import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import authorizedRequest from "../../firebase/authorizedRequest";

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
          authorizedRequest("http://localhost:5500/restricted", "get");
        }}
      >
        Make Private Request
      </button>
      <button
        onClick={() => {
          authorizedRequest(`http://localhost:5500/restricted/${uid}`, "get");
        }}
      >
        Make Private User Specific Request
      </button>
      <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>
    </div>
  );
}
