import firebaseApp from "./firebaseApp";

const authorizedRequest = async (url, method) => {
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

export default authorizedRequest;
