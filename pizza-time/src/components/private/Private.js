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

  const makeRestrictedRequest = async () => {
    const json = await authorizedRequest(
      "http://localhost:5500/api/restricted",
      "get"
    );
    setData(json);
  };

  // make sure the user trying to modify anything is the same user that's making the request
  const makeUserSpecificRestrictedRequest = async () => {
    const json = await authorizedRequest(
      `http://localhost:5500/api/restricted/${uid}`,
      "get"
    );
    setData(json);
  };

  // promote user to admin
  const promoteUserToAdmin = async () => {
    const json = await authorizedRequest(
      `http://localhost:5500/api/admin/promote/${uid}`,
      "get"
    );
    // when you update custom claims you need to refresh the users token
    //  for the changes totake effect
    await firebaseApp.auth().currentUser.getIdToken(true);
    setData(json);
  };

  const demoteAdminStatus = async () => {
    const json = await authorizedRequest(
      `http://localhost:5500/api/admin/demote/${uid}`,
      "put"
    );
    // when you update custom claims you need to refresh the users token
    //  for the changes totake effect
    await firebaseApp.auth().currentUser.getIdToken(true);
    setData(json);
  };

  const makeAdminRequiredRequest = async () => {
    const json = await authorizedRequest(
      `http://localhost:5500/api/restricted/${uid}/admin`,
      "get"
    );
    setData(json);
  };

  return (
    <div>
      <h1>This is a Private component</h1>
      <button onClick={makeRestrictedRequest}>Make Private Request</button>
      <button onClick={makeUserSpecificRestrictedRequest}>
        Make Private User Specific Request
      </button>
      <button onClick={promoteUserToAdmin}>Make User an Admin</button>
      <button onClick={demoteAdminStatus}>Revoke user's admin status</button>
      <button onClick={makeAdminRequiredRequest}>
        Make admin protected request
      </button>
      <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>
      {data && data.message ? <p>{data.message}</p> : null}
      {data && data.error ? <p style={{ color: "red" }}>{data.error}</p> : null}
    </div>
  );
}
