import firebaseApp from "./firebaseApp";

/**  this function takes in a url and a method
 and automatically attaches the token
 to the authorization header.*/
const authorizedRequest = async (url, method) => {
  try {
    //get the token off of the current user
    const token = await firebaseApp.auth().currentUser.getIdToken();

    const options = {
      method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: token
      }
    };
    const responseFromServer = await fetch(url, options);
    // console.log(responseFromServer);
    const json = await responseFromServer.json();
    // console.log(json);
    return json;
  } catch (e) {
    return e;
  }
};

export default authorizedRequest;
