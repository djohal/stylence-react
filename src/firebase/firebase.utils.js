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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
