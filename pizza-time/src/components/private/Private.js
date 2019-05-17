import React from "react";
import firebaseApp from "../../firebase/firebaseApp";

export default function Private() {
  const makeRequestWithFireBaseToken = async () => {
    //get the token off of the current user
    //idealistically this could be on some global state
    const token = await firebaseApp.auth().currentUser.getIdToken();

    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: token
      }
    };
    const responseFromServer = await fetch(
      "http://localhost:5000/restricted",
      options
    );
    const json = await responseFromServer.json();
    console.log(json);
    // setData(responseFromServer);
  };
  return (
    <div>
      <h1>This is a Private component</h1>
      <button onClick={makeRequestWithFireBaseToken}>
        Make Private Request
      </button>
      <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>
    </div>
  );
}
