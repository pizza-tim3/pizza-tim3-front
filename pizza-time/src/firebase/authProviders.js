import firebase from "firebase/app";
import "firebase/auth";

//auth providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");

export { googleProvider };
