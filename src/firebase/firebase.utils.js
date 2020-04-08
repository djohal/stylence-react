import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDC2jHOHl-UYbOzbVcStMTnqpOuFeZZ6s4",
  authDomain: "stylence-react.firebaseapp.com",
  databaseURL: "https://stylence-react.firebaseio.com",
  projectId: "stylence-react",
  storageBucket: "stylence-react.appspot.com",
  messagingSenderId: "702465997340",
  appId: "1:702465997340:web:040cf64289237cf8bc7dd9",
  measurementId: "G-Y2XKE4E1W5",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
