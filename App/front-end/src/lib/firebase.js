import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDfaziErTVRgVf0qdLAYxsZEukP7twjSQU",
  authDomain: "youniversity-243b5.firebaseapp.com",
  projectId: "youniversity-243b5",
  storageBucket: "youniversity-243b5.appspot.com",
  messagingSenderId: "845063505361",
  appId: "1:845063505361:web:06a38181d148bce0768cf0",
  measurementId: "G-K6PQBTK7Q5"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
