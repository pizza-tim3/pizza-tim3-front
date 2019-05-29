import firebaseApp from "./firebaseApp";

/**  this function takes in a url and a method
 and automatically attaches the token
 to the authorization header.*/
const authorizedRequest = async (url, method) => {
  //get the token off of the current user
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
  return json;
};

export default authorizedRequest;
