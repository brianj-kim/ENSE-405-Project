import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB5-CfPptp47XDFjs_VSDzg11rqoYYiwGU',
  authDomain: 'cloneinstagram-d1967.firebaseapp.com',
  projectId: 'cloneinstagram-d1967',
  storageBucket: 'cloneinstagram-d1967.appspot.com',
  messagingSenderId: '795062103025',
  appId: '1:795062103025:web:4f60fd9a6ac94baace7250'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
