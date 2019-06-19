import firebaseApp from "./firebaseApp";

/**  this function takes in a url and a method
 and automatically attaches the token
 to the authorization header.*/
const authorizedRequest = async (url, method, body = {}) => {
  const HTML_METHOD = method.toUpperCase();
  try {
    //get the token off of the current user
    const token = await firebaseApp.auth().currentUser.getIdToken();

    let options = {
      method: HTML_METHOD, // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
    if (HTML_METHOD !== "GET" && HTML_METHOD !== "HEAD") {
      options.body = JSON.stringify(body);
    }

    const responseFromServer = await fetch(url, options);
    console.log(responseFromServer);
    const json = await responseFromServer.json();
    console.log(json);
    return json;
  } catch (e) {
    return e;
  }
};

export default authorizedRequest;
