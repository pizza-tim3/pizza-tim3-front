import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase/firebaseApp";
import authorizedRequest from "../../firebase/authorizedRequest";

export default function Private() {
  const [uid, setUid] = useState(null);
  const [data, setData] = useState([]);

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
        onClick={async () => {
          const json = await authorizedRequest(
            "http://localhost:5500/restricted",
            "get"
          );
          setData(json);
        }}
      >
        Make Private Request
      </button>
      <button
        onClick={async () => {
          const json = await authorizedRequest(
            `http://localhost:5500/restricted/${uid}`,
            "get"
          );
          setData(json);
        }}
      >
        Make Private User Specific Request
      </button>
      <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>
      {data ? <p>{data}</p> : null}
    </div>
  );
}
